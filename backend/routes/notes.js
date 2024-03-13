const express = require('express')
const router = express.Router()
const Notes = require('../modules/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const { findByIdAndUpdate } = require('../modules/User')



router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.send(notes)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Internal Server Error")
    }
})
module.exports = router



router.post('/addnote', fetchuser,
    [
        body('title', 'Enter a Valid Title').isLength({ min: 3 }),
        body('description', 'Enter a valid description').isLength({ min: 5 }),
    ],
    async (req, res) => {
        const { title, description, tag } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)
        } catch (error) {
            console.log(error.message)
            return res.status(500).send("Internal Server Error")
        }

    })
    
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
    try {
        const {title, description, tag} = req.body
    
        const newNote={};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
    
        let note = await Notes.findById(req.params.id)
        
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Internal Server Error")
    }
})

router.delete('/deletenote/:id', fetchuser, async(req,res)=>{
    try {
        let note = await Notes.findById(req.params.id)
        
        if(!note){return res.status(404).send("Not Found")}
    
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not Allowed")
        }
    
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Internal Server Error")
    }
})
module.exports = router