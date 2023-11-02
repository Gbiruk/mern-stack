const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const bookSchema= new Schema({
    name:String,
    genre:String,
    authorID:String
})
module.exports = mongoose.model('books',bookSchema);//model is used to intgeract with mongo database