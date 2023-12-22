# Boilerplate Backend with Authentication REST API

## Purpose
The purpose of this project is to provide a boilerplate code for simple login and registration endpoints. 

## List of Libraries/Frameworks
* Node.js
* Express
* PostgreSQL
* pg-promise (DB pool connector/interface)
* JSONWebToken (authorization)
* Zod (custom schema validation middleware)
* bcrypt (password hashing)

## Development Process
The backend was developed using TypeScript, Express, Node, and PostgreSQL. 

Registration and login endpoints are located in the routes folder, under authRoutes.ts. SQL data is initially queried to check for an existing username/password entry. 
If a username or email is found already present in an entry within the DB, then a response with status code is sent. Otherwise, the password from the request body is hashed and salted, then stored in the database.

Zod is used to validate our request body, as we do not know what values to expect.

## How to Run
Create Node project:
```
npm init
```

Navigate to the project folder with package-lock.json and package.json.
Download all necessary libraries:
```
npm install bcrypt
npm install pg-promise
npm install zod
```

Clone the repository using:
```
git clone https://github.com/ekim2015/SampleAuth.git
```

Run the DB initialization script first:
```
node dbInit.ts
```

Now run!
```
node main.ts
```

Use Postman, or other way, to send HTTP requests.
