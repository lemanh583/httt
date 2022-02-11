const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  assign: {type: Boolean, default: false},
  complete: {type: Boolean, default: false},
  created_time: { type: Number, default: Date.now()},
  update_time: { type: Number, default: Date.now()}
});

module.exports = mongoose.model('task', taskSchema)
