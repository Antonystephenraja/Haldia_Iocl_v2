import mongoose from 'mongoose';
const Data = new mongoose.Schema({
    R_N:String,
    sensor1: String,
    sensor2: String,
    sensor3: String,
    sensor4: String,
    sensor5:String,
    time: String,
})
const DataModel = mongoose.model("insert",Data)
export default DataModel;



