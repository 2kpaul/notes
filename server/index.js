const port = process.env.PORT || 8000
const express = require('express')
const cors = require('cors')

const app = express()

//middleware
app.use(express.json())
app.use(cors())

const notes = require('./routes/api/notes')

app.use('/api/notes', notes)

app.listen(port, () => console.log('server runnig on port ' + port))