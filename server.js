//Declare variables to set up the server
const express = require("express");
const app = express()
const PORT = 4000;
const mongoose = require("mongoose");
require('dotenv').config()
const Appointment = require("./modules/appointments")
//how to add model variables

//In order to use ejs, you will need to set middleware
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //help pass right information going back and forth.

mongoose.connect(process.env.DB_OF_MONGO, {useNewUrlParser: true})
    .then(() => console.log("DB connection successful"))
    .catch(() => console.log("unable to connect to DB"))

//Get Method

app.get('/', async (req, res) => {
    try{
        const lists = await Appointment.find({}).exec();
        res.render("index.ejs", {
            listOfAppointment: lists
        })
    }catch(error){
        res.status(500).send({message: error.message})
    }
})

//Post Method

app.post("/", async (req,res) => {
    const appointmentList = new Appointment(
        {
            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            phone: req.body.phone,
            email: req.body.email,
        }
    )
    try{
        await appointmentList.save()
        res.redirect("/")
    }catch(err){
        if(err) return res.status(500).send(err)
            res.redirect('/')
        
    }
})

//edit or update

app.route("/edit/:id").get(async (req, res) => {
    try {
        const id = req.params.id;
        const lists = await Appointment.find({}).exec();
        res.render('edit.ejs', { listOfAppointment: lists, idLists: id });
    } catch (err) {
        res.status(500).send(err);
    }
}).post(async (req, res) => {
    try {
        const id = req.params.id;
        await Appointment.findByIdAndUpdate(id, {
            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            phone: req.body.phone,
            email: req.body.email,
        }).exec();
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.route("/remove/:id").get(async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Appointment.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(PORT, () => console.log(`port ${PORT} successfull`))