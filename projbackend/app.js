//INCLUDING ALL THE NECESSARY NPMs
require('dotenv').config();//old way of including but dotenv still uses it

const express=require('express');
const app=express();

const mongoose=require('mongoose');

const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');

//MY ROUTES
const authRoutes=require('./routes/auth.js');
const userRoutes=require('./routes/user.js');
const categoryRoutes=require('./routes/category.js');
const productRoutes=require('./routes/product.js');
const orderRoutes=require('./routes/order.js');



//DATABASE CONNECTION
mongoose
.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(()=>{
    console.log(`DB CONNECTED`);
})
//myfunction.run().then().catch()


//MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//ROUTES
app.use("/api", authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);



//PORT
const port = process.env.PORT || 8000;


//STARTING THE SERVER
app.listen(port, ()=>{
    console.log(`App is running at port : ${port}`);
})
