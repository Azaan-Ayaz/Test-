const express = require('express')
const App = express()
const dotenv = require("dotenv").config()
const studentRoutes = require("./routes/studentRoute")

const PORT =  process.env.PORT

App.use(express.json())

App.use("/api", studentRoutes) 

App.listen(PORT,() => {
    console.log(`Server is running on Port ${PORT}`)
})