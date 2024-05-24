"use strict";

const { mongoose } = require("../configs/dbConnection");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "categories", timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
