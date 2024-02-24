const express = require('express');
const router = express.Router();
const Room = require('../models/room')

router.get('/', async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Create a new room
  router.post('/addRoom', async (req, res) => {
    const room = new Room({
      roomNumber: req.body.roomNumber,

    });
  
    try {
      const newRoom = await room.save();
      res.status(201).json(newRoom);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Book a room
router.put('/:id/book', async (req, res) => {
    try {
      const seat = await Room.findById(req.params.id);
      if (!seat) return res.status(404).json({ message: 'Seat not found' });
  
      if (seat.booked) {
        return res.status(400).json({ message: 'Seat already booked' });
      }
  
      seat.allocatedTo = req.body.committeeDetails;
      seat.bookedAt = req.body.bookingTime;
      seat.booked = true;
  
      await seat.save();
      res.json(seat);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router;