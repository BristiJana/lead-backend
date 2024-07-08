const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT =  5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://dbuser:1234@cluster0.sq9rrxz.mongodb.net/test');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/auth', require('./server/routers/auth'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
