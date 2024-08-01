const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Post = require('./models/post');
const jwt = require('jsonwebtoken');
const { set } = require('mongoose');

const app = express();

// Mongoose connection
require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//middleware

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied, token missing!' });
    }

    try {
        const decoded = jwt.verify(token, 'shhhhh');
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Invalid token' });
    }
};


//register a user
app.post('/api/register', async (req, res) => {
    const { username, name, email, password, age } = req.body;

    // Validation
    if (!username || !name || !email || !password || !age) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }

    try {
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);



        // Create new user
        const user = await User.create({
            username,
            name,
            email,
            password: hash,
            age,
        });

        //set JWT token
        const token = jwt.sign({
            id: user._id,
            email: email,
        },
            'shhhhh',
        )


        res.cookie('token', token);



        // Send a success response
        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


//login a user
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Server error" });
            }

            if (result) {

                const token = jwt.sign({ id: user._id, email: user.email }, 'shhhhh')
                res.cookie("token", token)
                return res.status(200).json({ message: "Login successful" });
            } else {
                // If password does not match, send 401 error
                return res.status(401).json({ error: "Invalid credentials" });
            }
        });




    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
});

//logout a user
app.get('/api/logout', async (req, res) => {
    try {
        // Clear the 'token' cookie
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Server error during logout' });
    }
});


// Test route
app.get('/api', (req, res) => {
    res.send({ message: 'Hello from the server!' });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
