const express = require("express")
const app = express()
const mongoose = require("mongoose")
const taskModel = require("./model/task")
var bodyParser = require('body-parser')
const axios = require('axios')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', './views')

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


app.get('/', async (req, res) => {
  try {
    const rs = await taskModel.find()
    const rsAssign = await axios.get('http://localhost:3002/list')
    const rsCovid = await axios.get('https://api.covid19api.com/summary')
    // console.log()
    return res.render('index', {data: rs, listAssign: rsAssign.data.data, listCovid: rsCovid.data.Countries})
  } catch (error) {
    console.error(error)
    return res.status(500).send({success: false, message: error.message})
  }
})

app.get('/create', (req, res) => {
  res.render('create')
})

app.post('/create', async (req, res) => {
  try {
    const name = req.body.nameTask
    if(!name) return res.send(`<script>alert("Không được để trống");window.location.href = '/create'</script>`)
    const rs = await taskModel.create({name})
    res.redirect('/')
  } catch (error) {
    console.error(error)
    return res.status(500).send({success: false, message: error.message})
  }
})

app.get('/update/:id', async (req, res) => {
  const id = req.params.id
  const find = await taskModel.findById(id)
  res.render('update', {data: find})
})
app.post('/update/:id', async (req, res) => {
  const id = req.params.id
  const data = req.body
  const find = await taskModel.findByIdAndUpdate(id, data)
  res.redirect('/')
})


app.get('/assign', async (req, res) => {
  const rs = await taskModel.find()
  const rsStaff = await axios.get('http://localhost:3003/list')
  return res.render('assign', {data: rs, listStaff: rsStaff.data.data})
})

app.post('/assign', async (req, res) => {
  try {
    const data = req.body
    let obj = {
      staff_name: data.staffs.split(',')[1],
      task_name: data.tasks.split(',')[1],
      staff_id: data.staffs.split(',')[0],
      task_id: data.tasks.split(',')[0],
      time: data.time
    }
    const rs = await axios.post('http://localhost:3002/create', obj)
    const rsStaff = await axios.post(`http://localhost:3003/update/${data.staffs.split(',')[0]}`, {
      assign: true
    })
    const rsTask = await taskModel.findOneAndUpdate({_id: data.tasks.split(',')[0]}, {assign: true })
    if(rs.data.success && rsStaff.data.success && rsTask) {
      res.redirect('/')
    }
  } catch (error) {
    console.log(error)
  }
})

app.get('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const rs = await taskModel.findByIdAndDelete(id)
    if(rs) res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})


/** api
  *
  * 
*/ 
// create
app.post('/api/create', async (req, res) => {
    const data = req.body
    const rs = await taskModel.create(data)
    if(!rs) return res.status(500).send({success: false, message: "Create failed!"})
    return res.send({success: true, data: rs})
})

// list
app.get('/api/list', async (req, res) => {
    const rs = await taskModel.find()
    if(!rs) return res.status(500).send({success: false, message: "Get failed!"})
    return res.send({success: true, data: rs})
})

//update
app.post('/api/update/:id', async(req, res) => {
    const id = req.params.id
    const data = req.body
    if(!id) return res.status(500).send({success: false, message: "No id"})
    const rs = await taskModel.findByIdAndUpdate(id, data, {new: true})
    return res.send({success: true, data: rs})
})

//delete
app.delete('/api/delete/:id', async (req, res) => {
    const id = req.params.id
    if(!id) return res.status(500).send({success: false, message: "No id"})
    const rs = await taskModel.findByIdAndDelete(id)
    return res.send({success: true, data: rs})
})

app.listen(3001, () => console.log('Server run on port 3001 ----- task'))