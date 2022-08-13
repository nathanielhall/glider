import mongoose from 'mongoose';

var ExpenseSchema = mongoose.Schema({
  title: String,
  amount: Number,
  category: Number,
  description: String,
  username: String,
  isreported: Number
},
  {
    timestamps: true
  });

export default mongoose.model('Expense', ExpenseSchema);
