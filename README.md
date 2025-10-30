# 📝 Blog REST API

A professional RESTful API for blog/content management system with complete authentication, authorization, file upload, and CRUD operations.

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![Express](https://img.shields.io/badge/Express-5.x-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

### Authentication & Authorization
- ✅ User registration with email verification
- ✅ Secure login with JWT tokens
- ✅ Role-based access control (Super Admin, Admin, User)
- ✅ Password recovery via email
- ✅ Change password functionality
- ✅ Profile management with picture upload

### Content Management
- ✅ **Categories**: Full CRUD with admin protection
- ✅ **Posts**: Create, read, update, delete with file attachments
- ✅ **File Upload**: Support for images (JPG, PNG) and PDFs
- ✅ Advanced search and pagination
- ✅ Relationship management (User → Posts → Categories → Files)

### Security Features
- 🔒 Password hashing with bcryptjs
- 🔒 JWT authentication with 7-day expiration
- 🔒 Email verification system
- 🔒 Input validation with express-validator
- 🔒 Protected routes with middleware
- 🔒 File type validation

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **Multer** | File uploads |
| **Nodemailer** | Email sending |
| **Express Validator** | Input validation |
| **Morgan** | HTTP request logger |

## 📁 Project Structure

```
blog-rest-api/
├── config/              # Configuration files
├── controllers/         # Request handlers
├── models/             # Mongoose schemas
├── routes/             # API routes
├── middlewares/        # Custom middlewares
├── validators/         # Input validation rules
├── utils/              # Helper functions
├── init/               # Database connection
├── uploads/            # Uploaded files storage
├── app.js             # Express app setup
├── index.js           # Server entry point
└── package.json       # Dependencies
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/blog-rest-api.git
cd blog-rest-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create uploads directory**
```bash
mkdir uploads
```

4. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Server
PORT=8000
NODE_ENV=development

# Database
CONNECTION_URL=mongodb://localhost:27017/blog-api

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Email (Gmail with App Password)
SENDER_EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

> **📧 Gmail Setup**: You need to enable 2FA and generate an [App-Specific Password](https://support.google.com/accounts/answer/185833)

5. **Start the server**

```bash
# Development mode (with auto-reload)
npm start

# Production mode
NODE_ENV=production npm start
```

The server will run on `http://localhost:8000`

## 📚 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | ❌ |
| POST | `/auth/signin` | Login user | ❌ |
| POST | `/auth/send-verification-email` | Send verification code | ❌ |
| POST | `/auth/verify-user` | Verify email with code | ❌ |
| POST | `/auth/forgot-password-code` | Request password reset | ❌ |
| POST | `/auth/recover-password` | Reset password with code | ❌ |
| PUT | `/auth/change-password` | Change current password | ✅ |
| PUT | `/auth/update-profile` | Update user profile | ✅ |
| GET | `/auth/current-user` | Get logged user info | ✅ |

### Category Endpoints

| Method | Endpoint | Description | Auth | Admin Only |
|--------|----------|-------------|------|------------|
| POST | `/category/add-category` | Create category | ✅ | ✅ |
| GET | `/category` | List all categories | ✅ | ❌ |
| GET | `/category/:id` | Get single category | ✅ | ❌ |
| PUT | `/category/:id` | Update category | ✅ | ✅ |
| DELETE | `/category/:id` | Delete category | ✅ | ✅ |

### Post Endpoints

| Method | Endpoint | Description | Auth | Admin Only |
|--------|----------|-------------|------|------------|
| POST | `/posts` | Create post | ✅ | ❌ |
| GET | `/posts` | List all posts | ✅ | ❌ |
| GET | `/posts/:id` | Get single post | ✅ | ❌ |
| PUT | `/posts/:id` | Update post | ✅ | ❌ |
| DELETE | `/posts/:id` | Delete post | ✅ | ❌ |

### File Upload Endpoint

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/file/upload` | Upload file | ✅ |

**Supported file types**: JPG, JPEG, PNG, PDF

### Query Parameters

- `?page=1` - Page number (default: 1)
- `?size=10` - Items per page (default: 10)
- `?q=search` - Search query (searches in title, description)
- `?category=id` - Filter posts by category ID

## 🔐 User Roles

| Role | Value | Description |
|------|-------|-------------|
| **Super Admin** | 1 | Full system access |
| **Admin** | 2 | Manage content |
| **User** | 3 | Default role, limited access |

## 📝 API Usage Examples

### 1. Register User

```bash
curl -X POST http://localhost:8000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mohamed Hassan",
    "email": "mohamed@example.com",
    "password": "SecurePass123",
    "role": 3
  }'
```

**Response:**
```json
{
  "code": 200,
  "status": true,
  "message": "User Created Successfully"
}
```

### 2. Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mohamed@example.com",
    "password": "SecurePass123"
  }'
```

**Response:**
```json
{
  "code": 200,
  "status": true,
  "message": "Login Successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Create Category (Admin Only)

```bash
curl -X POST http://localhost:8000/api/v1/category/add-category \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Technology",
    "desc": "All about tech and innovation"
  }'
```

### 4. Upload File

```bash
curl -X POST http://localhost:8000/api/v1/file/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

### 5. Create Post

```bash
curl -X POST http://localhost:8000/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "desc": "This is an amazing post about Node.js",
    "file": "FILE_ID_FROM_UPLOAD",
    "category": "CATEGORY_ID"
  }'
```

### 6. Get Posts with Pagination

```bash
curl -X GET "http://localhost:8000/api/v1/posts?page=1&size=10&q=nodejs" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testing

```bash
# Run tests (coming soon)
npm test

# Run tests with coverage
npm run test:coverage
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `CONNECTION_URL` | MongoDB connection string | `mongodb://localhost:27017/blog-api` |
| `JWT_SECRET` | Secret for JWT signing | `your-secret-key` |
| `SENDER_EMAIL` | Gmail address for emails | `email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail app-specific password | `abcd efgh ijkl mnop` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## 🚨 Common Issues

### Issue: Email not sending

**Solution**: 
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App-Specific Password
3. Use the app password in `EMAIL_PASSWORD`

### Issue: MongoDB connection failed

**Solution**:
- Check if MongoDB is running: `mongod --version`
- Verify `CONNECTION_URL` in `.env`
- For Atlas, ensure IP is whitelisted

### Issue: File upload fails

**Solution**:
- Ensure `uploads/` directory exists
- Check file type (only JPG, JPEG, PNG, PDF allowed)
- Verify file size is within limits

## 📦 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set CONNECTION_URL=your-mongodb-atlas-url

# Deploy
git push heroku main
```

### Deploy to Railway/Render

1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Mohamed Hassan Abdallah**

- GitHub: [@MoHassan4](https://github.com/MoHassan4)
- Email: mohamedhassanmido123@gmail.com

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB & Mongoose docs
- JWT.io for token verification
- Nodemailer for email functionality


⭐ **If you find this project helpful, please give it a star!**

Made with ❤️ by Mohamed Hassan
