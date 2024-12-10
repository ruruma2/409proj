const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

// MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://mentormatch:unc12@cluster0.9rul0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
require('./routes/mentorMatch')(router);
app.use('/api', router);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
