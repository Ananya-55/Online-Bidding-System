# Setup Instructions
## Prerequisites
1. Node.js: Ensure Node.js is installed. It can downloaded from here.
2. MySQL: Ensure MySQL server is installed and running.
3. npm: Node Package Manager, which comes with Node.js.
## .env File
Create a .env file in the root of your project with the following content:
DB_HOST=db_host
DB_USER=db_user
DB_PASSWORD=db_password
DB_NAME=db_name
## 1. Backend Setup
Navigate to the root directory of your project and run:
npm install
This will install all the necessary dependencies listed in package.json.
## 2. Frontend Setup
Navigate to the client directory and run:
cd client
npm install
This will install all the necessary dependencies for the React frontend.
## 3. Database Setup
Ensure MySQL server is running. Create a database that matches the name specified in the .env file (DB_NAME).
The models defined in models/User.js and models/AuctionItem.js will sync with database automatically when the server is started.
## 4. Start the Application
 Starting the Backend:
node server.js
 Starting the Frontend:
Navigate to the client directory and run:
npm start
