const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const profileRoutes = require('./routes/profileRoutes');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const PORT = process.env.PORT;
const dbConnect = require('./config/database');

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}))

//connecting with db
dbConnect();

//connecting with cloudinary
cloudinaryConnect();



//mounting api
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/paymetn', paymentRoutes);


//starting serverr
app.listen(PORT, ()=>{
    console.log(`Server started at PORT no. ${PORT}`);
})

app.get('/', (req,res)=> {
    res.send("This is home page bay")
})

