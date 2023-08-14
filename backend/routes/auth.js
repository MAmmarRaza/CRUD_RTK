const express = require('express');
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const addUsers = require("../models/Users")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const fetchUsers = require('../middleware/fetchUser');

const Jwt_Secret_Key = "KeyByRafaySty@le";

router.get("/login", (req, res) => {
    res.send("Hello Login");
    console.log(req.body);
});

router.post('/signup', async (req, res) => {
    try {
        const user1 = await addUsers.findOne({ email: req.body.email });
        if (user1) {
            return res.send('This user with this email is already inserted.');
        }else{
            const salt = await bcrypt.genSalt(10);
            const securePass = await bcrypt.hash(req.body.password, salt)
    
            const userData = new addUsers({
                name: req.body.name,
                email: req.body.email,
                password: securePass
            });

            await userData.save();

            const getData = {
                userData: {
                    id: userData.id
                }
            }
            const auth_token = jwt.sign(getData, Jwt_Secret_Key);
            console.log('Data inserted.');
            return res.json(auth_token);
        }

    } catch (error) {
        console.log('Catch Block');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user1 = await addUsers.findOne({ email });
        if (!user1) {
            return res.send("Incorrect logins");
        }

        const cmpPass = await bcrypt.compare(password, user1.password);
        if (!cmpPass) {
            return res.send("Incorrect logins");
        }
        const getData = {
            user: {
                id: user1.id
            }
        }
        const auth_token = jwt.sign(getData, Jwt_Secret_Key);
        console.log('login');
        return res.json(auth_token);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/getUser", fetchUsers,async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await addUsers.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
