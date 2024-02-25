const express = require('express');
const router = express.Router();
const Event = require('../models/events');
const fetchuser = require('../middleware/fetchuser');
const feedback = require('../models/feedback');

// Route to get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to add a new event
router.post('/addEvents', async (req, res) => {
  const { title, date, location, image, tag, description, link, department } = req.body;
  try {
    const newEvent = new Event({
      title,
      date,
      location,
      image,
      tag,
      description,
      link,
      department
    });
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:eventId/rsvp', fetchuser, async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id; // Assuming user ID is available in request

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.registeredUsers.includes(userId)) {
            return res.status(400).json({ message: 'User already registered for this event' });
        }

        event.registeredUsers.push(userId);
        await event.save();

        res.status(200).json({ message: 'RSVP successful' });
    } catch (error) {
        console.error('Error RSVPing to event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to save feedback
router.post('/:eventId/feedback', fetchuser, async (req, res) => {
  try {
      const eventId = req.params.eventId;
      const userId = req.user.id;
      const { rating, likedMostRating, improvementsRating, recommendationRating, comments } = req.body;

      // Assuming these ratings are numeric
      const numericLikedMostRating = parseFloat(likedMostRating);
      const numericImprovementsRating = parseFloat(improvementsRating);
      const numericRecommendationRating = parseFloat(recommendationRating);
      const numericRating = parseFloat(rating);

      const newFeedback = new feedback({
          eventId,
          userId,
          rating: numericRating,
          likedMostRating: numericLikedMostRating,
          improvementsRating: numericImprovementsRating,
          recommendationRating: numericRecommendationRating,
          comments
      });

      await newFeedback.save();
      res.status(201).json({ message: 'Feedback saved successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
