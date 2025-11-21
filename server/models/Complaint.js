const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'Maintenance', 'Security', 'Amenities'
  description: { type: String, required: true },
  status: { type: String, enum: ['New', 'In Progress', 'Resolved'], default: 'New' },
  dateSubmitted: { type: Date, default: Date.now },
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resolutionNotes: { type: String },
  resolvedAt: { type: Date }
});

module.exports = mongoose.model('Complaint', complaintSchema);