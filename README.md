# Backend Design with Node.Js & Express
## Description:

This repository is a simple backend exercise program with the follownig features and middlewares:

## Features
- **User Registration**
- **User Login**
- **User Profile**

## Middlewares
- **Logging Middleware**
- **Authentication Middleware**
- **Rate Limiter Middleware**


## Dependencies Installation:
**npm install bcrypt body-parser dotenv express express-rate-limit joi jsonwebtoken morgan mysql mysql2 sequelize sequelize-cli**

## .enf file 
```javascript
PORT = 3000
JWT_SECRET=your_jwt_secret
```

## Run App
```npm run dev or npm start```

## API TESTS FOR POSTMAN

### POST Register

```bash
http://localhost:3000/routes/Register
```

```bash
{
"username":"Vladimir Putin",
"password":"Putina@gmail.com",
"email":"AllHailHydra"
}
```

### POST Login

```bash
http://localhost:3000/routes/Login
```

```bash
{
"username":"josemariachan@gmail.com",
"password":"merrychristmasandhappynewyear"
}
```

### GET User Profile

```bash
http://localhost:3000/routes/UserProfile
```

```bash
POSTMAN
Headers
Key: Authorization
Value: Bearer <your-jwt-token>
```

### GET Current Users

```bash
http://localhost:3000/routes/UsersData
```
