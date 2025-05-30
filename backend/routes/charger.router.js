const express = require('express');
const router = express.Router();
const Charger = require('../models/charger.model'); // Ensure this file exists and is correctly named

// ✅ Create a new charger
router.post('/addcharger', async (req, res) => {
  try {
    const { name, location, powerOutput, connectorType, status } = req.body;
    const newCharger = new Charger({
      name,
      location,
      powerOutput,
      connectorType,
      status
    });
    await newCharger.save();
    res.status(201).json(newCharger);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all chargers
router.get('/getcharger', async (req, res) => {
  try {
    const chargers = await Charger.find();
    res.json(chargers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update a charger by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Charger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Charger not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete a charger by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Charger.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Charger not found' });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
