const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    timeDuration:{
        type:Object,
        required:true,
        hrs:{
            type:String,
            default:"00"
        },
        mins:{
            type:String,
            default:"00"
        },
        secs:{
            type:String,
            default:"00"
        },
    },
    description:{
        type:String,
        required:true,
    },
    videoUrl:{
        type:String,
        required:true
    }


})

module.exports = mongoose.model("SubSection",subSectionSchema);