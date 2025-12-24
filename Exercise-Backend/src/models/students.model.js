// backend/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgLink: String,
  present: { type: Boolean, default: true },
  batch: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);