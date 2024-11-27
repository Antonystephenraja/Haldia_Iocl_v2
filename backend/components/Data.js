import mongoose from 'mongoose';
const dataSchema = new mongoose.Schema({
    inputValue: String,
  });
const Data = mongoose.model('Data', dataSchema);
export default Data;
