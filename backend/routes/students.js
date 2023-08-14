// nodemon ./index.js
const express = require('express');
const router = express.Router();
const addStudents = require("../models/Students")

router.post('/create', async (req, res) => {
    try {
        const userData = new addStudents({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });

        await userData.save();
        res.send("Data inserted");
        // console.log('Inserted 1');
        const user2 = await addStudents.findOne({ title: req.body.title });
        if (user2) {
            res.send("Data inserted Students");
            console.log('Data inserted Students');
        }
    } catch (error) {
        console.log('Catch Block in add Students');
        res.send('Catch Block in add Students');
    }
});

router.get('/', async (req, res) => {
    const fetch = await addStudents.find();
    res.send(fetch);
})

router.get('/getStudent/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let studentData = await addStudents.findOne({ _id: id }); // Use findOne instead of find

        if (!studentData) { // Check if user is null or undefined
            res.json('Student not Found');
        } else {
            res.send(studentData);
            console.log("Send student Data");
        }
    } catch (error) {
        res.json('catch block of student Data');
    }
});

// Update Student - form submission
router.put('/update/:Id', async (req, res) => {
    try {
        let id = req.params.Id;
        await addStudents.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        });

        res.send('Update Student');
    } catch (error) {
        res.send('Not Update Student');
        console.log('Not Update Student');
    }
});


router.delete('/delete/:Id', async (req, res) => {
    try {
        const id = req.params.Id;
        console.log("Id in Api: ", id);
        const checkStudentExist = await addStudents.findById(id);
        if (!checkStudentExist) {
            res.send('Student not found');
            return;
        }

        // Delete the data in the database
        let studentDataDelete = await addStudents.findOneAndRemove({ _id: id });

        res.send(studentDataDelete);
        console.log('Student Delete');
    } catch (error) {
        res.send('Error in Student Delete');
        console.log('Error in Student Delete');
    }
});
module.exports = router;

