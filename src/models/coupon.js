"use strict";

const { mongoose } = require("../configs/dbConnection");

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      validate: [
        (code) => /^[A-Z]*\d{1,}T{3,}\d{1,}$/.test(code),
        "Code type is not correct.",
      ],
    },
    discount: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { collection: "coupons", timestamps: true }
);

module.exports = mongoose.model("Coupon", CouponSchema);
