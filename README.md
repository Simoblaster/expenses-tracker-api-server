# expenses-tracker-api-server
Open-source version of my favourite expenses tracker application.

# Application structure
- **Database:** MySQL
- **Back-End:** Express.js
- **Front-End:** React.js

# Config API Server
Insert in **config.json** your DB info.

You will need to configure and smtp server for the email verification.
For testing you can create a free account in one click at https://ethereal.email/ and copy the options below the title Nodemailer configuration.

# Run API Server
For start nodemon development server run command **npm run start:dev**

Application will be served on http://localhost:4000

# Register a test user
With Postman execute a POST request at http://localhost:4000/accounts/register with this body:

```
{
    "title": "Mr",
    "firstName": "Jhonny",
    "lastName": "Pinna",
    "email": "j.pinna@example.com",
    "password": "my-super-secret-password",
    "confirmPassword": "my-super-secret-password",
    "acceptTerms": true
}
```

-- Under development --
