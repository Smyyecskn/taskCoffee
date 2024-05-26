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
    shippingCost: {
      type: Number,
      default: function () {
        return this.amount > 500 ? 0 : 54.99;
      },
      transform: function () {
        return this.amount > 500 ? 0 : 54.99;
      },
    },

    discount: {
      type: Number,
      set: function () {
        if (this.amount >= 3000) {
          return this.amount * 0.25;
        } else if (this.amount < 2000) {
          return this.amount * 0.2;
        } else if (this.amount < 1500) {
          return this.amount * 0.15;
        } else {
          return this.amount * 0.1;
        }
      },
    },
  },
  { collection: "orders", timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
