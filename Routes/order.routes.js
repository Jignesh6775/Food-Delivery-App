const express = require("express");
const { OrderModel } = require("../Models/order.model");

const OrderRouter = express.Router();

OrderRouter.get("/orders", async (req,res) => {
    const data = await Order.find()
    res.send(data);
})

OrderRouter.post('/orders',  async (req, res) => {
  try {
    const { user, restaurant, items, totalPrice, deliveryAddress } = req.body;

    const order = new OrderModel({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status: "placed",
    });

    await order.save();
    const addedOrder = await OrderModel.findById(order._id)
      .populate("user", "password")
      .populate("restaurant")
      .exec();
    res.status(201).json(addedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order Failed" });
  }
});

OrderRouter.get('/orders/:id', async (req, res) => {
    try {
      const orders = await OrderModel.findById(req.params.id)
      if (!orders) {
        return res.status(404).json({ message: 'Order id Not Avalible' });
      }
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Order Failed' });
    }
  });



  OrderRouter.patch('/orders/:id', async (req, res) => {
    try {
      const { status } = req.body;
      const orders = await OrderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!orders) {
        return res.status(404).json({ message: 'Order id Not Avalible' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Order Failed' });
    }
  });

module.exports={
    OrderRouter
}