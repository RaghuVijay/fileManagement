<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

## Description

AWS S3 File Management API built with NestJS by Vijay Kumar. This application provides secure file upload and download functionality with AWS S3 integration.

## Development Journey

### AWS S3 Configuration

1. Created an AWS account and S3 bucket
2. Established IAM policies for secure bucket access
3. Configured IAM user with appropriate permissions
4. Generated security credentials (access key, secret key)
5. Stored credentials in environment variables

### Backend Implementation

**Why NestJS?**

- Built-in CLI for project scaffolding
- Excellent error handling capabilities
- Angular-like structure for familiarity
- Built-in FileInterceptor for file uploads

**Implementation Steps:**

1. Set up NestJS project structure
2. Created `aws.config` file with S3 connection
3. Used `@nestjs/aws-sdk` package for AWS integration
4. Implemented file size (5MB) and type restrictions (JPEG, PNG, GIF, PDF)
5. Developed upload/download endpoints

## Features

- 🚀 File upload with 5MB limit (JPEG, PNG, GIF, PDF)
- 📥 File download via unique S3 key
- 🔒 Secure AWS S3 integration
- 📚 Interactive Swagger documentation
- 🛠 TypeScript support

## Installation

```bash
$ npm install
Configuration
Create .env file in root directory:

env
AWS_BUCKET_NAME=your-s3-bucket-name
AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
Running the App
bash
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
API Documentation
Access Swagger UI at: http://localhost:3000/api

How to Use
Upload Files:

Visit /upload endpoint via Swagger UI

Select your file (max 5MB)

Receive response containing file key and URL

Download Files:

Use the key received from upload

Access /upload/download/{key} endpoint

File will automatically download

Example Requests
Upload File:

bash
curl -X POST -F "file=@test.jpg" http://localhost:3000/upload
Download File:

bash
curl -X GET http://localhost:3000/upload/download/123e4567-e89b-12d3-a456-426614174000-test.jpg --output downloaded-file.jpg
Testing
bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
Deployment
For production deployment:

Disable Swagger in production by modifying main.ts:

typescript
if (process.env.NODE_ENV !== 'production') {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
Consider using NestJS Mau for AWS deployment:

bash
$ npm install -g mau
$ mau deploy
Support
For issues or questions, please:

Open an issue on GitHub

Join our Discord channel

License
This project is MIT licensed.


Key improvements:
1. Added "Development Journey" section with your personal insights
2. Structured the AWS configuration steps clearly
3. Highlighted your NestJS implementation decisions
4. Maintained all technical documentation
5. Kept the professional format while incorporating your narrative
6. Added clear "How to Use" instructions
7. Preserved all badges and legal information
```
