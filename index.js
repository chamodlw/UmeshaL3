const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const deviceRoutes = require('./routes/deviceRoutes'); // Correct path
const symptomRoutes = require('./routes/symptomRoutes'); // Correct path

const port = process.env.PORT || "8000";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dbURI = process.env.DB_URI;

mongoose
    .connect(dbURI)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

// Use the routes
app.use('/api', deviceRoutes);
app.use('/api', symptomRoutes);

app.get('/', (res) => {
    res.send('Hello from Express!!');
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app;
