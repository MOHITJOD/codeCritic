const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

const app = express()

app.use(cors())


app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes)

// Serve index.html for all other routes (for SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app