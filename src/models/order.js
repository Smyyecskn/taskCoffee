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

    bonusCoffee: {
      type: Boolean,
      set: function () {
        this.amount > 3000 ? true : false;
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
          return (this.amount * 0.25) + this.bonusCoffee;
        } else if (this.amount < 2000) {
          return this.amount * 0.2;
        } else if (this.amount < 1500) {
          return this.amount * 0.15;
        } else if (this.amount > 1000) {
          return this.amount * 0.1;
        } else if (this.amount >= 500) {
          return this.amount;
        } else {
          return this.shippingCost;
        }
      },
    },

    totalAmount: {
      type: Number,
      set: function () {
        return this.amount - this.discount + this.shippingCost;
      },
    },
  },
  { collection: "orders", timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
