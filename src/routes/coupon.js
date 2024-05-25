"use strict";

const router = require("express").Router();
/* ------------------------------------------------------- */

const coupon = require("../controllers/coupon");
// const { isAdmin } = require("../middlewares/permissions");

// router.use(isAdmin);

//URL:/coupons
router.route("/").get(coupon.list).post(coupon.create);
router
  .route("/:id")
  .get(coupon.read)
  .put(coupon.update)
  .patch(coupon.update)
  .delete(coupon.delete);

/* ------------------------------------------------------- */
module.exports = router;
