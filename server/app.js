const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();

// Mongoose connection
require('./db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

        // Send a success response
        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
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
