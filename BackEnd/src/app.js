const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const path = require('path');

const app = express()

app.use(cors())


app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/ai', aiRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app