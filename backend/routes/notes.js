const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Notes = require('../models/Notes');


// Get  All Notes details : GET "/api/notes/fetchallnotes". require Auth
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occured");
    }

});

// Post  Notes details : POST "/api/notes/addnote". require Auth
router.post('/addnote', fetchuser, [

    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid desc').isLength({ min: 5 })

], async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
});

// Update  Notes details : POST "/api/notes/updatenote". require Auth
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // create note obj
        const newNote = {};
        if (title) { newNote.tatle = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // Find note to update
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not found"); }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
});
// Delete  Notes details : Delete "/api/notes/deletenote". require Auth
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find note to Delete
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not found"); }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ message:"Note deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Some error occured");
    }
});
module.exports = router;