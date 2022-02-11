const express = require("express")
const app = express()
const mongoose = require("mongoose")
const assignModel = require("./model/assign")
app.use(express.json())

const connectDB = async () => {
    try {
      const connect = await mongoose.connect(
        // `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@db-news.mn3s0.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
        `mongodb://127.0.0.1:27017/httt`
      );
      if (connect) console.log("DB connected");
    } catch (error) {
      console.error(error.message);
    }
  };
connectDB();

app.post('/create', async (req, res) => {
  const data = req.body
  const rs = await assignModel.create(data)
  return res.send({success: true, data: rs})
})

app.get('/list', async (req, res) => {
  const rs = await assignModel.find()
  return res.send({success: true, data: rs})
})

app.listen(3002, () => console.log('Server run on port 3002 --------- assign'))
