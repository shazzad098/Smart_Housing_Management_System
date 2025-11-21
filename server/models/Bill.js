const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  billId: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // e.g., 'Monthly Maintenance', 'Electricity'
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Paid', 'Due', 'Overdue'], default: 'Due' },
  resident: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentDate: { type: Date },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bill', billSchema);