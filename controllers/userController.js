require('dotenv').config();
const { getUsers } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');

// Define validation schema for user registration using Joi
const registrationValidation = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const registerUser = async (req, res) => {
    try {
        const validationResult = registrationValidation.validate(req.body); //validates the request body from schema
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }

        const { username, email, password } = req.body;

        const users = getUsers(); //gets the current users
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists with this email' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10); // Hash the password before saving it
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: encryptedPassword
        };
        
        users.push(newUser); //add new user to the data users
        res.status(201).json({ user: newUser, message: 'Account successfully created' });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log("Login attempt:", req.body);

        const validationResult = loginValidation.validate(req.body); //validates the request body from schema
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }

        const { email, password } = req.body;

        const users = getUsers(); //gets the current users
        const userRecord = users.find(user => user.email === email);
        if (!userRecord) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        const passwordIsValid = await bcrypt.compare(password, userRecord.password); // Compare the provided password with the hashed password
        if (!passwordIsValid) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        const accessToken = jwt.sign({ email: userRecord.email }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Create a JWT token for the authenticated user
        res.status(200).json({ token: accessToken, message: 'Login successful' }); //returns token and message for you to input in POSTMAN

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};

const fetchUserProfile = (req, res) => {
    try {
        const users = getUsers(); //gets the current users
        const userProfile = users.find(user => user.email === req.user.email);
        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(userProfile); // Return the user profile
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const usersData = (req, res) => {
    try {
        const users = getUsers(); //gets the current users
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message }); //returns error if there is problems
    }
};

module.exports = {
    registerUser,
    loginUser,
    fetchUserProfile,
    usersData
};
