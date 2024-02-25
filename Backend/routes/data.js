const express = require('express');
const router = express.Router();
const DataModel = require('../models/data');
const multer = require('multer');
const path = require('path');
const fetchuser = require('../middleware/fetchuser');
const user = require('../models/user')

// Define multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save uploaded files to the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  }
});

const upload = multer({ storage: storage });

// Add new data with file upload
router.post('/', upload.single('poaPdf'), async (req, res) => {
  try {
    const { id, committeeName, eventType, eventName, convenorName, eventDate, duration, status } = req.body;
    const poaPdf = req.file ? req.file.filename : ''; // Save filename instead of path

    const newData = new DataModel({ id, committeeName, eventType, eventName, convenorName, eventDate, duration, poaPdf, status });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all data
router.get('/', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// department specific Get all data
router.get('/department', fetchuser,async (req, res) => {
  try {
    const userId = req.user.id;
    const commitee = await user.findById(userId);
    const commiteeName = commitee.department;
    const data = await DataModel.find({"committeeName": commiteeName});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve PDF files
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.put('/status/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const newData = await DataModel.findById(id);
    const previousStatus = newData.status;
    const updatedStatus = previousStatus ? `${previousStatus}, ${status}` : status;
    newData.status = updatedStatus;
    await newData.save();
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update data by ID
router.put('/:id', upload.single('poaPdf'), async (req, res) => {
  try {
    const id = req.params.id;
    const { committeeName, eventType, eventName, convenorName, eventDate, duration, status } = req.body;
    const poaPdf = req.file ? req.file.filename : null;

    const updatedData = {
      committeeName,
      eventType,
      eventName,
      convenorName,
      eventDate,
      duration,
      poaPdf,
      status
    };

    await DataModel.findByIdAndUpdate(id, updatedData);
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Delete data by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await DataModel.findByIdAndDelete(id);
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});






module.exports = router;
