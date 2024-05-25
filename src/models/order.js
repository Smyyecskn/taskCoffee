"use strict";

const { mongoose } = require("../configs/dbConnection");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, //unique değil çünkü bir kullanıcı birden fazla sipariş verebilir
    },
    coffeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coffee",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
    amount: {
      type: Number,
      set: function () {
        return this.price * this.quantity + this.shippingCost;
      },
      default: function () {
        return this.price * this.quantity + this.shippingCost;
      },
      transform: function () {
        return this.price * this.quantity + this.shippingCost;
      },
    },
    shippingCost: {
      type: Number,
      default: this.amount > 500 ? 0 : 54.99,
    },
  },
  { collection: "orders", timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
