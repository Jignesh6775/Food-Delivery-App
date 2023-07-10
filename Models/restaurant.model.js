const mongoose = require("mongoose")

const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zip: { type: String }
    },
    menu: [{
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        image: { type: String }
    }]
}, {
    timestamp: true,
    versionKey: false
})


const RestaurantModel = mongoose.model("restaurant", restaurantSchema)

module.exports = { RestaurantModel }

  
  