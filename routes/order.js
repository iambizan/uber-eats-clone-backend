const express = require("express");
const router = express.Router();

const { Order, orderValidation } = require("../models/order");

router.get("/", async (req, res) => {
  const orders = await Order.find();
  return res.status(200).send(orders);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = orderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const newOrder = new Order({
    bill: req.body.bill,
    items: req.body.items,
    restaurantName: req.body.restaurantName,
    orderedAt: req.body.orderedAt,
  });

  const result = await newOrder.save();
  setTimeout(() => res.status(200).send(result), 2000);
});

module.exports = router;
