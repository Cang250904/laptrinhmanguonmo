const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  try {
    const { service_id, date, time, number_of_people } = req.body;
    const reservation = new Reservation({ user_id: req.userId, service_id, date, time, number_of_people });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user_id: req.userId }).populate('service_id');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation || reservation.user_id.toString() !== req.userId) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    await reservation.remove();
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
