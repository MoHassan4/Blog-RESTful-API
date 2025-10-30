const { File, Category, Post } = require("../models");

const addPost = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { title, desc, file, category } = req.body;

    if (file) {
      const isFileExist = await File.findById(file);

      if (!isFileExist) {
        res.code = 400;
        throw new Error("File not found");
      }

      const isCategoryExist = await Category.findById(category);
      if (!isCategoryExist) {
        res.code = 400;
        throw new Error("Category Not Found");
      }

      const newPost = new Post({ title, desc, file, category, updatedBy: _id });

      await newPost.save();

      res
        .status(200)
        .json({ code: 200, status: true, message: "Post Added Sucessfully" });
    }
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, desc, file, category } = req.body;

    const { _id } = req.user;

    const { id } = req.params;

    if (file) {
      const isFileExist = await File.findById(file);

      if (!isFileExist) {
        res.code = 400;
        throw new Error("File Not Found");
      }
    }

    if (category) {
      const isCategoryExist = await Category.findById(category);

      if (!isCategoryExist) {
        res.code = 400;
        throw new Error("Category Not Found");
      }
    }

    const post = await Post.findById(id);

    if (!post) {
      res.code = 400;
      throw new Error("Post Not Found");
    }

    post.title = title ? title : post.title;
    post.desc = desc ? desc : post.desc;
    post.file = file ? file : post.file;
    post.category = category ? category : post.category;
    post.updatedBy = _id;

    await post.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "Post Updated Successfully" });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.code = 400;
      throw new Error("Post Not Found");
    }

    await Post.findByIdAndDelete(id);

    res
      .status(200)
      .json({ code: 200, status: true, message: "Post Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { page, size, q, category } = req.query;

    const pageNumber = parseInt(page) || 1;
    const sizeNumber = parseInt(size) || 10;

    const query = {};

    if (q) {
      const search = new RegExp(q, "i");

      query = {
        $or: [{ title: search }],
      };
    }

    if (category) {
      query = { ...query, category };
    }

    const total = await Post.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const posts = await Post.find(query)
      .populate("file")
      .populate("category")
      .populate("updatedBy", "-password -forgotPasswordCode -verificationCode")
      .sort({ updatedBy: -1 })
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber);

    res.status(200).json({
      code: 200,
      status: true,
      message: "Posts Fetched Successfully",
      data: { posts, total, pages },
    });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("file")
      .populate("category")
      .populate("updatedBy", "-password -forgotPasswordCode -verificationCode");

    if (!post) {
      res.code = 400;
      throw new Error("Post Not Found");
    }

    res
      .status(200)
      .json({ code: 200, status: true, message: "Post Fetched Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { addPost, updatePost, deletePost, getPosts, getPost };
