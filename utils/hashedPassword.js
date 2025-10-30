const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt(12, (error, salt) => {
      if (error) {
        return rej(error);
      }

      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return rej(error);
        }

        res(hash);
      });
    });
  });
};

module.exports = hashPassword;
