const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../model/userSchema'); 

// Load secret key from environment variable
const secretKey = process.env.JWT_SECRET || 'root';

// Register route
router.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const existingUser = await User.findOne({ email: userData.email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User(userData);
        await newUser.save();
        const token = jwt.sign({ userId: userData._id }, secretKey, { expiresIn: '1h' });

        res.json({ token, userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const userData = req.body;
        const token = jwt.sign({ userId: userData._id }, secretKey, { expiresIn: '1h' });
        res.json({ token, userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

router.get('/getusers', async (req, res) => {
    try {
      const users = await User.find({});
      return res.send({ users });
    } catch (error) {
      console.error('Failed to fetch users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

router.get("/protected", authenticateToken, async (req, res) => {

    res.json({ message: 'You are authenticated!' });
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
}

module.exports = router;
