const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// get notes
router.get('/', async (req, res) => {
    const notes = await loadNotesCollection();
    res.send(await notes.find({}).toArray())
})

// add note
router.post('/', async (req, res) =>{
    const notes = await loadNotesCollection();
    await notes.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })

    res.status(201).send()
})

// delete note
router.delete('/:id', async (req, res) => {
    const notes = await loadNotesCollection();
    await notes.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})

async function loadNotesCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://notes:notes2021@notes.9e9pj.mongodb.net/notes?retryWrites=true&w=majority', {useNewUrlParser: true})

    return client.db('notes').collection('notes')
}



module.exports = router