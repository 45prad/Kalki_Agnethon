const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  id: Number,
  committeeName: String,
  eventType: String,
  eventName: String,
  convenorName: String,
  eventDate: Date,
  duration: Number,
  poaPdf: String,
  status: { type: String, enum: ['Pending from all', 'Approval from HoD', 'Approval from Principal', 'Approval from Secretary'], default: 'Pending from all' }
});

module.exports = mongoose.model('Data', dataSchema);
