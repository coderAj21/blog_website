const express=require("express");
const app=express();
require("dotenv").config();
const PORT=process.env.PORT || 5051;
const route=require("./routes/routes");
const connectDB = require("./config/database");
const cookie_parser=require("cookie-parser");
const cors=require("cors");



app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}));

app.use(cookie_parser());

// middleware
app.use(express.json());

// for parsing the cookie


app.use("/api/v1",route);

app.get("/",(req,res)=>(
    res.send("Server is Working...")
))


connectDB(); 
app.listen(PORT,()=>{
    console.log("Server is Running...");
})








