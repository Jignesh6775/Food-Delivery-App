const express = require("express")
const restaurantRouter = express.Router()
const { RestaurantModel } = require("../Models/restaurant.model")
require("dotenv").config()


//Create resturant
restaurantRouter.post("/restaurants", async (req, res) => {
    try {
        const restaurants = new RestaurantModel(req.body)
        await restaurants.save()
        res.status(201).send({ 'msg': 'A New Restaurant Successfully Created' })
    } catch (err) {
        res.status(500).send({ 'msg': err.message })
    }
})

//Get all restaurant list
restaurantRouter.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await RestaurantModel.find()
        res.status(200).send(restaurants)
    } catch (err) {
        res.status(500).send({ 'msg': err.message })
    }
})

//Get restaurant by id
restaurantRouter.get("/restaurants/:id", async (req, res) => {
    const { id } = req.params
    try {
        const restaurants = await RestaurantModel.findById(id)
        if (!restaurants) {
            return res.status(404).send({ 'msg': 'Restaurant id is not valid' })
        }
        res.status(200).send(restaurants)
    } catch (err) {
        res.status(500).send({ 'msg': err.message })
    }
})

//Post restaurant menu by id
restaurantRouter.post("/restaurants/:id/menu", async (req, res) => {
    const { id } = req.params
    const { name, description, price, image } = req.body
    try {
        const newMenu = { 
            name:name, 
            description: description, 
            price: price, 
            image: image 
        }

        let create = await RestaurantModel.findByIdAndUpdate(id, {$push: {menu: newMenu}}, {new:true})
        res.status(201).send({ 'msg': 'A New Menu has been added to Restaurant' })
    } catch (err) {
        res.status(500).send({ 'msg': err.message })
    }
})

//Get restaurant menu by id
restaurantRouter.get("/restaurants/:id/menu", async (req, res) => {
    const { id } = req.params
    try {
        const restaurants = await RestaurantModel.findById(id)
        res.status(201).send(restaurants.menu)
    } catch (err) {
        res.status(500).send({ 'msg': err.message })
    }
})

restaurantRouter.delete("/restaurants/:id/menu/:menuID", async (req, res) => {
    const id = req.params.id
    const menuID = req.params.menuID
    try {
        const menu = await RestaurantModel.findById(id)
        if(menu){
            await RestaurantModel.findByIdAndDelete(menuID)
        }
        return res.status(202).send({ 'msg': 'A Menu has been deleted from Restaurant' })
    } catch (err) {
        res.status(500).send({ 'msg': err.message })
    }

})


module.exports = { restaurantRouter }