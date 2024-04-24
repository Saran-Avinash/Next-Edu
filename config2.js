const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/login")


const collegeSchema = new mongoose.Schema({
    name: {
        type:String,
    required: true},
    admission: {
        type:String,
        required: true
    },
    city: {
        type:String,
    required: true}
});

const College = mongoose.model('College', collegeSchema);

// const data = [
//     {name: 'kec',
//     admission: 'tnea',
//     city: 'Erode'    
// }
// ]

// College.insertMany(data);

module.exports = College