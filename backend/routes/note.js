// nodemon ./index.js
const express = require('express');
const router = express.Router();
const addNotes = require("../models/Notes")
const fetchUsers = require('../middleware/fetchUser');

router.get('/fetchNotes', async (req, res) => {
    try{
        const fetchNotes = await addNotes.find();
        
        res.status(200).json(fetchNotes);
    }
    catch(e){
        res.status(500).json(fetchNotes);
    }
})

router.get('/fetchNoteById', async (req, res) => {
    const id=req.body.id;
    try{
        const fetchNotes = await addNotes.find(id);
        
        res.status(200).json(fetchNotes);
    }
    catch(e){
        res.status(500).json(fetchNotes);
    }
})

// Route to handle the add post form submission
router.post('/addNotes', async (req, res) => {
    try {
        const data = new addNotes({
            user:req.body.user,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        });
        // res.json(userData)
        await data.save();
        res.status(200).json(data);
    } catch (error) {
        
        res.status(500).json(error);
    }
});


// Route to handle the update post form submission
router.put('/updateNotes/:id', async (req, res) => {
    console.log(req.params.id, req.body.title);
    try {
        let id = req.params.id;
        await addNotes.findByIdAndUpdate(id, {
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        });
        const user2 = await addNotes.findOne({ _id: id });
        res.status(200).send(user2);
    } catch (error) {
        res.status(500).send('Not Update');
        console.log('Not Update');
    }
});

router.delete('/deleteNotes/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await addNotes.findById(id);

        if (!user) {
            res.send('Notes not found');
            return;
        }

        const response= await addNotes.findOneAndRemove({ _id: id })
        res.status(200).json(response._id);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
