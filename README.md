# DentalIQ

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

A comprehensive dental clinic management system built with Node.js and Express, designed to streamline clinic operations and improve patient care management.

## Prerequisites

Before you begin, ensure you have the following installed:

### Core Requirements
- [Git](https://git-scm.com/) (Latest version)
- [Node.js](https://nodejs.org/) (>= 14.x)
- [MongoDB](https://www.mongodb.com/) (>= 4.x)
- [npm](https://www.npmjs.com/) (>= 6.x)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd DentalIQ
```

### 2. Install Dependencies
```bash
npm install
```

## Configuration

### Environment Setup
we will define it later
<!-- 1. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

2. Configure your environment variables in the `.env` file:
```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/dentaliq

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# File Upload Configuration
UPLOAD_PATH=public/uploads
``` -->



## Running the Application

### Development Mode
```bash
npm run dev
# OR
nodemon index.js
```

### Production Mode
```bash
npm start
```

### Expected Output
When the service is running successfully, you should see:
```bash
Server running on port 3000
http://localhost:3000
```


## Testing

```bash
# Run all tests
npm test

# Run specific tests
npm test -- --grep "Auth"
```