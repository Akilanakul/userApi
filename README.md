
# User API

This User Registration API provides functionalities to create a new user and retrieve users by their last name. It uses Node.js, TypeScript, and TypeORM with SQLite as an in-memory database.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** - [Download from Node.js official website](https://nodejs.org/)
- **npm** - Comes with Node.js

## Clone the repository

```bash
git clone https://github.com/Akilanakul/userApi.git
```

## Setup

Change directory to the project folder and install dependencies:

```bash
cd .\userApi\user-register-api
npm install  # Installs dependencies
npm run build  # Builds the project
```

## Running the Application and Testing

1. Start the development server:

```bash
npm run start:dev  # Run this from the root directory
```

2. Creating a New User:

```bash
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"firstName\": \"John\", \"lastName\": \"Akila\", \"email\": \"john.doe@example.com\"}"
```

3. Retrieving Users by Last Name:

```bash
curl -X GET "http://localhost:3000/api/users?lastName=Doe"
```

## Running Tests

```bash
npm run test
```
