const express = require("express");
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtScrete = process.env.SECRET_KEY;

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 6 }),
    body('password', 'Incorrent Password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        }).then(res.json({ success: true }))

    } catch (error) {
        console.log(error);
        res.json({ success: false })
    }
})

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrent Password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;

    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try loggin with correct email" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try loggin with correct password" });
        }
        const data = {
            user:{
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtScrete)
        return res.json({ success: true, authToken:authToken })
    } catch (error) {
        console.log(error);
        res.json({ success: false })
    } 
})

module.exports = router;