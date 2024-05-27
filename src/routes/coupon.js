"use strict";

const router = require("express").Router();
/* ------------------------------------------------------- */

const coupon = require("../controllers/coupon");
const { isAdmin, isLogin } = require("../middlewares/permissions");

//URL:/coupons
router.route("/").get(isLogin, coupon.list).post(isAdmin, coupon.create);
router
  .route("/:id")
  .get(isLogin, coupon.read)
  .put(isAdmin, coupon.update)
  .patch(isAdmin, coupon.update)
  .delete(isAdmin, coupon.delete);

/* ------------------------------------------------------- */
module.exports = router;
