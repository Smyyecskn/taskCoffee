"use strict";

const { mongoose } = require("../configs/dbConnection");

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      // validate: {
      //   validator: function (coupon) {
      //     // Regex: İki sayı arasında en az 3 adet 'T' karakteri
      //     // const code = /^[A-Z]*\d{1,}T{3,}[A-Z]*\d$/;
      //     const code = /^[A-Z]*\d{1,}T{3,}\d{1,}$/.test(code),
      //     return code.test(code);
      //   },
      //   message: (props) => `${props.value} geçerli bir kupon kodu değil!`,
      // },
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
      type: String,
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
