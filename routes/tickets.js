const express = require('express');
const Ticket = require('../models/Ticket');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/tickets
router.post('/', auth, async (req, res) => {
  const { subject, description, category } = req.body;

  try {
    const ticket = new Ticket({
      subject,
      description,
      category,
      createdBy: req.user.id
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Ticket creation failed', error: err.message });
  }
});

module.exports = router;

// ✅ GET /api/tickets/my — Get tickets created by the logged-in user
router.get('/my', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tickets', error: err.message });
  }
});
