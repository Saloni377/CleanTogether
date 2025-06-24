const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all rewards for a specific user
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT r.*, e.event_name 
    FROM rewards r
    JOIN events e ON r.event_id = e.event_id
    WHERE r.user_id = ? ORDER BY r.awarded_at DESC
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch rewards' });
    res.json(results);
  });
});

// POST a reward
router.post('/', (req, res) => {
  const { user_id, event_id, points, badge_name } = req.body;
  const sql = `INSERT INTO rewards (user_id, event_id, points, badge_name) VALUES (?, ?, ?, ?)`;
  db.query(sql, [user_id, event_id, points, badge_name], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add reward' });
    res.status(201).json({ message: 'Reward added successfully' });
  });
});

module.exports = router;
