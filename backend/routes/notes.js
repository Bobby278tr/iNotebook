const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using GET "/api/notes/createUser". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

})

// ROUTE 2:Add a new Notes using POST "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Password must be of atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    // If there are errors return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

})

// ROUTE 3:Update an existing Note using PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a newNote object
        const newNotes = {};
        if (title) { newNotes.title = title };
        if (description) { newNotes.description = description };
        if (tag) { newNotes.tag = tag };

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('User not authorized');
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

})

// ROUTE 4:Delete an existing Note using DELETE "/api/notes/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found") }

        // Allow deletion only if  user is the owner of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('User not authorized');
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "SUCCESS": `Note with title -- ${note.title} -- has been Deleted`, note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Internal Server Error')
    }

})

module.exports = router