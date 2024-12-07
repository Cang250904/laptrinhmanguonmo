const express = require('express');
const { createReservation, getReservations, deleteReservation } = require('../controllers/reservationController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, createReservation);
router.get('/', authenticate, getReservations);
router.delete('/:id', authenticate, deleteReservation);

module.exports = router;
