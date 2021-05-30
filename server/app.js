const express = require('express')
const multer = require('multer')
const { convertor } = require('./controllers/convertorController')

const app = express()

app.use(express.json())

const upload = multer({ dest: 'pdf/' })

app.post('/api/convert', upload.array('files'), convertor)

const port = 3001

app.listen(port, err => {
    if (err) {
        console.log(`error on connecting server}`)
        process.exit(1)
    }
    console.log(`server is up on port ${port}`)
})
