const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const { convertor } = require('./controllers/convertorController')

const app = express()

const upload = multer({ dest: 'pdf/' })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/convert', upload.array('data'), convertor)

const port = 3001

app.listen(port, err => {
    if (err) {
        console.log(`error on connecting server}`)
        process.exit(1)
    }
    console.log(`server is up on port ${port}`)
})
