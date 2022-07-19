const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Images", ImageSchema);