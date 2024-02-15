const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.URL)
    .then(()=>console.log("Db connected succesfully"))
    .catch((err)=> console.log(err));
}

module.exports = dbConnect;