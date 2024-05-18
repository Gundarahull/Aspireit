const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    file:{
        type:String,   //url from Cloudiary
        required:true
    }

},{timestamps:true})

const File = mongoose.model('File', fileSchema);

module.exports = File;