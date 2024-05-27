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
      default: function () {
        return parseFloat((this.price * this.quantity).toFixed(2));
      },
    },
    bonusCoffee: {
      type: Boolean,
      default: function () {
        return this.amount > 3000;
      },
    },
    shippingCost: {
      type: Number,
      default: function () {
        return this.amount > 500 ? 0 : 54.99;
      },
    },
    discount: {
      type: Number,
      default: function () {
        return this.calculateDiscount();
      },
    },
    totalAmount: {
      type: Number,
      default: function () {
        return parseFloat(
          (this.amount - this.discount + this.shippingCost).toFixed(2)
        );
      },
    },
  },
  { collection: "orders", timestamps: true }
);

//pre-middleware ile hesap yontemi
OrderSchema.pre("save", function (next) {
  this.amount = parseFloat((this.price * this.quantity).toFixed(2));
  this.bonusCoffee = this.amount > 3000;
  this.shippingCost = this.amount > 500 ? 0 : 54.99;
  this.discount = this.calculateDiscount();
  this.totalAmount = parseFloat(
    (this.amount - this.discount + this.shippingCost).toFixed(2)
  );
  next();
});

// indirim hesaplama yontemi
OrderSchema.methods.calculateDiscount = function () {
  if (this.amount >= 3000) {
    return this.amount * 0.25 + (this.bonusCoffee ? 1 : 0);
  } else if (this.amount >= 2000) {
    return this.amount * 0.2;
  } else if (this.amount >= 1500) {
    return this.amount * 0.15;
  } else if (this.amount >= 1000) {
    return this.amount * 0.1;
  } else {
    return 0;
  }
};

module.exports = mongoose.model("Order", OrderSchema);
