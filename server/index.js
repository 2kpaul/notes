const port = process.env.PORT || 5000
const express = require('express')
const cors = require('cors')

const app = express()

//middleware
app.use(express.json())
app.use(cors())

const notes = require('./routes/api/notes')

app.use('/api/notes', notes)

//handle production
if(process.env.NODE_ENV === 'production') {
    //set static folder for production
    app.use(express.static(__dirname + '/public'))

    //handle single page app
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(port, () => console.log('server runnig on port ' + port))