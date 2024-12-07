const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Import routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/service');
const reservationRoutes = require('./routes/reservations');

// Use routes
app.use('/auth', authRoutes);
app.use('/services', serviceRoutes);
app.use('/reservations', reservationRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
