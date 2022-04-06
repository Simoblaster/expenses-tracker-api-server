# expenses-tracker-api-server
Open-source version of my favourite expenses tracker application.

# Application structure
- **Database:** MySQL
- **Back-End:** Express.js
- **Front-End:** React.js

# Congig API Server
Insert in **config.json** your DB info.

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
