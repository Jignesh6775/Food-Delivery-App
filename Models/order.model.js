const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user : { type: ObjectId, ref: 'User' },
    restaurant : { type: ObjectId, ref: 'Restaurant' },
    item: [{
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number }
    }],
    totalPrice: { type: Number },
    deliveryAddress: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zip: { type: String }
    },
    status: { 
        type: String,
        enum: [ "placed", "preparing", "on the way", "delivered" ]
    }
}, {
    timestamp: true,
    versionKey: false
})

const OrderModel = mongoose.model("order", orderSchema)

module.exports = { OrderModel }