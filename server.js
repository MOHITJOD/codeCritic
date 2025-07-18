require('dotenv').config()
const app = require('./BackEnd/src/app')

import path from 'path';
import express from 'express';

const app = express();

// Serve frontend static files
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('*', (_, res) => {
  res.sendFile(path.join(process.cwd(), 'public/index.html'));
});

// your existing API routes…


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})