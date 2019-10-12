const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  cash: {
    type: Number,
    default: 5000
  },
  tickers: [
    {
      name: {
        type: String,
        uppercase: true
      },
      qty: {
        type: Number
      }
    }
  ],
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
