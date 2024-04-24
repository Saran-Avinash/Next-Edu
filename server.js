require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const collection = require("./config");
const collection2 = require("./config2");
 
const bcrypt = require('bcrypt');

const app = express()
// mongoose.connect(process.env.MONGO_URL)
// const db = mongoose.connection;
// db.on('error', (error) => console.log(error))
// db.once('open', ()=> console.log('Connected to database'))

app.use(express.json());

app.use(express.urlencoded({extended: false}));


app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/' , (req, res) =>{
    res.render('index.ejs')
})

app.get('/login', (req, res) =>{
    res.render('login.ejs')
})

 
app.get('/register', (req, res) =>{
    res.render('register.ejs')
})


app.get('/home', (req, res) =>{
    res.render('home.ejs')
})
app.get('/architecture', (req, res) =>{
    res.render('architecture.ejs')
})



app.get('/diploma', (req, res) => {
    res.render('diploma.ejs');
})

app.get('/12th', (req, res) => {
    res.render('12th');
})
app.get('/arts&science', (req, res) => {
    res.render('arts&science.ejs');
})
app.get('/diploma', (req, res) => {
    res.render('diploma.ejs');
})

app.get('/law', (req, res) => {
    res.render('law.ejs');
})
app.get('/management', (req, res) => {
    res.render('management.ejs');
})

app.get('/medical', (req, res) => {
    res.render('medical.ejs');
})

app.get('/landing', (req, res) => {
    res.render('landing');
})


// app.post('/register', (req, res) =>{
    
// })

//register user

app.post('/register', async (req, res) => {
    
    const data = {
        email: req.body.email,
        password: req.body.password
    }

    const existingUser = await collection.findOne({email: data.email});
    if(existingUser){
        res.send("User already exists. try another name");
    }
   else{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.send("Successfully registered");
   }
})


app.post("/login", async(req, res) => {
    try{
        const check = await collection.findOne({email: req.body.email});

        // console.log(check);
        if(!check){
            res.send("user cannot be found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)  
        if(isPasswordMatch){
            res.render("home", {});
        }
        else{
            res.send("wrong password");
        }
    }
        catch{
                res.send("wrong details");
        }
})

const data = {
    name: "kec",
    admission: "tnea",
    city: "karur"
}

const insdata =  collection2.insertMany(data);
app.get('/engineering', async (req, res) => {

    try{
       const college = await collection2.find({});
       
        res.render('engineering', {college});
    }catch(error){
        console.log(error);
    }
})
 

app.listen(5000)