// backend/routes/studentRoutes.js
const express = require('express');
const studentsModel = require('../models/students.model');
const studentRouter = express.Router();

// GET all students (optionally by batch)
studentRouter.get('/', async (req, res) => {
  try {
    const { batch } = req.query;
    const filter = batch ? { batch } : {};
    const students = await studentsModel.find(filter);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new student
studentRouter.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update a student (e.g., toggle present)
studentRouter.patch('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a student
studentRouter.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = studentRouter;