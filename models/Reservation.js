const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  number_of_people: { type: Number, required: true },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
