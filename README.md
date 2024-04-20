# User Api
This User Registration API provides functionalities to create a new user and retrieve users by their last name. It uses Node.js, TypeScript, and TypeORM with SQLite as an in-memory database.

#Prerequisites
Before you begin, ensure you have the following installed:

Node.js (Download from Node.js official website)
npm (Comes with Node.js)

#Clone the repository:
git clone https://github.com/yourusername/yourprojectname.git

#Cd to the project and run
npm install(installs dependencies)
npm run build

#Running the Application and Testing
1 . npm run start:dev (run this from root directory, it will start up server locally)

2 . Creating a New User: run this in windows commandline
curl -X POST http://localhost:3000/api/users -H "Content-Type: application/json" -d "{\"firstName\": \"John\", \"lastName\": \"Akila\", \"email\": \"john.doe@example.com\"}"

2 . Retrieving Users by Last Name:
curl -X GET "http://localhost:3000/api/users?lastName=Doe"

#Running Tests

npm run test
