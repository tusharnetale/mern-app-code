// models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  dateOfSale: Date,
  isSold: Boolean,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
