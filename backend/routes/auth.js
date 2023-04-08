const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Akhlaque_Ahmad";

// Create a User using : POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    // If there are error return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {

        let user = await User.findOne({ 'email': req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry user already exists" });
        }
        const salt = await bcrypt.genSalt(10);

        const secPassword = await bcrypt.hash(req.body.password, salt);
        // Create New User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        });
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
});

// Create a User using : POST "/api/auth/login". Doesn't require Auth
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid password').exists()
], async (req, res) => {
    // If there are error return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Sorry user does not exist" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success:false,error: "Sorry password does not exist" });
        }
        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ success:true,authToken });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
});

// Get  User details : POST "/api/auth/getUser". require Auth
router.get('/getUser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(400).json({ error: "Sorry user does not exist" });
        }
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
});
module.exports = router;