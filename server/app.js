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
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

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
        return res.status(402).json({ error: "Please fill all the fields" });
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

        console.log("userId::", user)
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

//get the uesr
app.get('/api/user', authenticateToken, async (req, res) => {
    try {
        // Use the ID from the token to find the user in the database
        const user = await User.findById(req.user.id).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//create the post 
app.post('/api/post', authenticateToken, async (req, res) => {
    try {
        const { content } = req.body;

        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new post
        const post = await Post.create({
            userId: user._id,
            content: content,
        });

        user.posts.push(post._id);
        await user.save();
        await post.save();

        console.log('Created Post:', post);

        res.status(200).json({ post });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/api/user/posts', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'posts',
            populate: {
                path: 'userId',
                model: 'User'
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ posts: user.posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//like and unlikes apis. 
app.post('/api/post/:id/like', authenticateToken, async (req, res) => {

    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) {
            res.status(404).json({ message: 'No Post for this user' })
        }

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id.toString() !== userId)
            await post.save();
            return res.status(200).json({ message: 'Post unlike sucessfully', post })
        }
        else {
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({ message: 'Post liked sucessfully', post })
        }

    } catch (error) {
        console.log('error while liking the post', error);
    }

});

// Edit a post
app.put('/api/post/:id', authenticateToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });


        if (post.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        post.content = content;
        await post.save();

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
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
