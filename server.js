
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

const app = express();

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// BODY PARSER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS MIDDLEWARE
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
}));

app.get('/', (req, res) => {
    // res.send('Hello World'); //This takes text and json content
    res.json({ message: 'Welcome to the RandomIdeas API'}) // This just takes json content
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));

