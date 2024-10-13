const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Update MongoDB Atlas URL
const DB_URL = "YOUR_UPDATED_MONGODB_ATLAS_URL_HERE";

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Successfully connected to MongoDB Atlas"))
    .catch(err => {
        console.error('Database connection error', err);
        process.exit();
    });

app.use('/', noteRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
