const express = require('express');
const router = express.Router();
const noteModel = require('../models/Notes');

// Create a new Note
router.post('/notes', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'MEDIUM'
    });

    note.save()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Error creating note"
        }));
});

// Retrieve all Notes
router.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => res.send(notes))
        .catch(err => res.status(500).send({
            message: err.message || "Error retrieving notes"
        }));
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
    noteModel.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found" });
            }
            res.send(note);
        })
        .catch(err => res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        }));
});

// Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    noteModel.findByIdAndUpdate(req.params.noteId, {
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'MEDIUM',
        dateUpdated: Date.now()
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found" });
            }
            res.send(note);
        })
        .catch(err => res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        }));
});

// Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
    noteModel.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found" });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => res.status(500).send({
            message: "Error deleting note with id " + req.params.noteId
        }));
});

module.exports = router;
