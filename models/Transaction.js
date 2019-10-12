const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TransactionSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  ticker: {
    type: String,
    required: true,
    uppercase: true
  },
  qty: {
    type: Number,
    required: true
  },
  transaction_date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
