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
        return this.price * this.quantity;
      },
      default: function () {
        return this.price * this.quantity;
      },
      transform: function () {
        return this.price * this.quantity;
      },
    },

    coupon: {
      type: String,
      trim: true,
    },
  },
  { collection: "orders", timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
