// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRouter = require('./src/routes/studentRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', studentRouter);
app.get('/',(req,res)=>{
  res.send('This is homepage')
})
// Connect to MongoDB
// console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/studentDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));