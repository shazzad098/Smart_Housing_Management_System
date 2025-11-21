const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flatNo: { type: String, required: true },
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  entryTime: { type: Date, default: Date.now },
  exitTime: { type: Date },
  purpose: { type: String, enum: ['Guest', 'Delivery', 'Service', 'Family'], default: 'Guest' },
  status: { type: String, enum: ['Inside', 'Exited', 'Upcoming'], default: 'Inside' },
  qrCode: { type: String }, // Unique token for gate entry
  vehicleNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', visitorSchema);