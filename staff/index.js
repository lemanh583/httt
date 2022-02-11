const express = require("express");
const app = express();
const staffModel = require("./model/staff")
app.use(express.json())

//create 
app.post('/create', async (req, res) => {
    // await sequelize.authenticate();
    const data = req.body
    if(!data.name) return res.status(500).send({success: false, message: "No name"})
    const rs = await staffModel.create(data)
    return res.send({success: true, data: rs})
})

//list 
app.get('/list', async (req, res) => {
    const rs = await staffModel.findAll()
    return res.send({success: true, data: rs})
})

//update
app.post('/update/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
    if(!id) return res.status(500).send({success: false, message: "No id"})
    const rs = await staffModel.update(data, {where: {id}})
    return res.send({success: true, data: rs})
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    if(!id) return res.status(500).send({success: false, message: "No id"})
    const rs = await staffModel.destroy({where: {id}})    
})



app.listen(3003, () => console.log("Server run on port 3003 -- staff"));