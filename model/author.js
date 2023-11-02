const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const authorschema= new Schema({
    name:String,
    age:Number
})
module.exports = mongoose.model('Author',authorschema);//model is used to intgeract with mongo database colection