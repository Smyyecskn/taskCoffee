"use strict";

const { mongoose } = require("../configs/dbConnection");

const CoffeeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock_quantity: {
      type: Number,
      required: true,
    },

    origin: {
      type: String,
      trim: true,
      required: true,
    },
    roast_level: {
      type: String,
      trim: true,
      required: true,
    },
    flavor_notes: Array,
  },
  {
    collection: "coffees",
    timestamps: true,
  }
);

module.exports = mongoose.model("Coffee", CoffeeSchema);
