const express= require("express");
const app =express()
const cors =require('cors')
const connectDB =require('./database.js');
require('dotenv').config()
const port=process.env.PORT
connectDB()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/api/auth', require("./routes/auth.router"))
app.use("/api/chargers", require('./routes/charger.router.js'));


app.listen(port,()=>{
    console.log(`the server is working on http://localhost:${port}`)
})