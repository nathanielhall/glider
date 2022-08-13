import mongoose from 'mongoose';

var ReportSchema = mongoose.Schema({
  name: String,
  amount: Number,
  items: String,
  policy: String,
  from: String,
  to:String,
  submited: { type: String, default: '' },
  exported: Number
},
  {
    timestamps: true
  });

export default mongoose.model('Reports', ReportSchema);
