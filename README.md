# AWS S3 File Management API with NestJS 🚀

![NestJS Logo](https://nestjs.com/img/logo-small.svg)
![AWS S3 Logo](https://d1.awsstatic.com/icons/jp/console_s3_icon.6d9a1d02d0b72468a6d5735984bb25aafd0ce4d7.png)

[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![Package License](https://img.shields.io/npm/l/@nestjs/core.svg)](LICENSE)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/~nestjscore)
[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master)](https://circleci.com/gh/nestjs/nest)
[![Coverage](https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9)](https://coveralls.io/github/nestjs/nest?branch=master)

A secure and efficient file management API built with **NestJS** that integrates with **AWS S3** for cloud storage operations. Developed by Vijay Kumar.

## 🌟 Features

- 🚀 Secure file uploads with size (5MB) and type restrictions (JPEG, PNG, GIF, PDF)
- 📥 File downloads via unique S3 keys
- 🔒 AWS S3 integration with IAM policy security
- 📚 Interactive Swagger API documentation
- 🛠 TypeScript support with strict typing
- ✅ Comprehensive test coverage

## Table of Contents
1. [Development Journey](#-development-journey)
2. [Installation](#-installation)
3. [Configuration](#-configuration)
4. [Running the App](#-running-the-app)
5. [API Documentation](#-api-documentation)
6. [API Endpoints](#-api-endpoints)
7. [Testing](#-testing)
8. [Deployment](#-deployment)
9. [Support](#-support)
10. [License](#-license)

## 🛠️ Development Journey

### AWS S3 Configuration
1. Created AWS account and S3 bucket
2. Established IAM policies for secure access
3. Configured IAM user with granular permissions
4. Generated security credentials (access key + secret key)
5. Securely stored credentials in environment variables

### Backend Implementation
**Why NestJS?**
- Built-in CLI for rapid scaffolding
- Angular-like architecture for familiarity
- Built-in `FileInterceptor` for uploads
- Excellent error handling capabilities

**Implementation Steps:**
1. Scaffolded NestJS project structure
2. Created AWS configuration module
3. Integrated `@nestjs/aws-sdk` package
4. Implemented file validation middleware
5. Developed RESTful upload/download endpoints

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/RaghuVijay/fileManagement.git

# Install dependencies
npm install
```

## 🔐 Configuration

Create `.env` file in root directory:

```env
AWS_BUCKET_NAME=your-s3-bucket-name
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

## 🖥️ Running the App

```bash
# Development mode (watch mode)
$ npm run start:dev

# Production build
$ npm run build

# Production mode
$ npm run start:prod
```

## 📡 API Endpoints

### 🔹 File Upload
**Endpoint:** `POST /upload`  
**Description:** Upload files to AWS S3 with validation  
**Restrictions:**
- Max file size: 5MB
- Allowed types: JPEG, PNG, GIF, PDF

**cURL Example:**
```bash
curl -X POST -F "file=@test.jpg" http://localhost:3000/upload
```

**Response:**
```json
{
  "status": "success",
  "key": "123e4567-e89b-12d3-a456-426614174000-test.jpg",
  "url": "https://your-bucket.s3.region.amazonaws.com/123e4567-e89b-12d3-a456-426614174000-test.jpg"
}
```

### 🔹 File Download
**Endpoint:** `GET /upload/download/:key`  
**Description:** Download files from AWS S3 using file key  
**Parameters:**
- `key` (string, required): S3 object key from upload response

**cURL Example:**
```bash
curl -X GET http://localhost:3000/upload/download/123e4567-e89b-12d3-a456-426614174000-test.jpg --output downloaded-file.jpg
```

**Response:**  
File stream with `Content-Disposition: attachment` header for automatic download

## 📚 API Documentation

Access interactive Swagger UI at:  
`http://localhost:3000/api` (during development)

![Swagger UI Preview](https://miro.medium.com/v2/resize:fit:1400/1*J9qZsZ3U4xDD3-ljB3d8fg.png)

## 🧪 Testing

```bash
# Run unit tests
$ npm run test

# Run e2e tests
$ npm run test:e2e

# Generate test coverage report
$ npm run test:cov
```

## 🚀 Deployment

For production deployment:

1. Disable Swagger in `main.ts`:
```typescript
if (process.env.NODE_ENV !== 'production') {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
```

2. Recommended deployment options:
- **AWS Elastic Beanstalk**: Fully managed service
- **Docker Containerization**: For consistent environments
- **Serverless Framework**: For AWS Lambda deployment

3. Deploy using NestJS Mau:
```bash
$ npm install -g mau
$ mau deploy
```

## 🆘 Support

For issues or questions:
- [Open a GitHub Issue](https://github.com/fileManagement/issues)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <em>"Efficient file management in the cloud with NestJS and AWS S3"</em>
  <br>
  <img src="https://img.shields.io/badge/Made%20with-NestJS-e0234e?style=for-the-badge&logo=nestjs" alt="Made with NestJS">
  <img src="https://img.shields.io/badge/AWS-S3-FF9900?style=for-the-badge&logo=amazonaws" alt="AWS S3">
</p>
