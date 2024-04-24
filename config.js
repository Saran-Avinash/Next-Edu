const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/login")


//check connection

connect.then(()=> {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("failed");
});


//create a schema

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    college_name:{
        type: String
    },
    admission: {
        type: String
    }

})


const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;