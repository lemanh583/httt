const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignSchema = new Schema({
  staff_name: String,
  task_name: String,
  staff_id: String,
  task_id: String,
  created_time: {type: Number, default: Date.now()},
  update_time: {type: Number, default: Date.now()},
  time: Number
});

module.exports = mongoose.model("assign", assignSchema);
