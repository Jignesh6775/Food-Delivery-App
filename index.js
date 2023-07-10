const express = require("express")
require("dotenv").config()
const port = process.env.PORT || 8080
const { connection } = require("./Connections/db")
const { restaurantRouter } = require("./Routes/restaurant.routes")
const { userRouter } = require("./Routes/user.routes")
const { OrderRouter } = require("./Routes/order.routes")
const app = express()

app.use(express.json())

app.get("/", (req, res)=>{
    res.status(201).send("Use /api route for move forward")
})

app.use("/api", userRouter)
app.use("/api", restaurantRouter)
app.use("/api", OrderRouter)


app.listen(port, async()=>{
    try {
        await connection
        console.log("CONNECTED TO MONGODB")
    } catch (error) {
        console.log("NOT CONNECTED TO MONGODB")
        console.log(error)
    }
    console.log(`SERVER IS RUNNING ON PORT ${port}`)
})