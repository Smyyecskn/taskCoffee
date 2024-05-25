"use strict";

const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/:

// user:
router.use("/user", require("./user"));
// token:
router.use("/token", require("./token"));
// auth:
router.use("/auth", require("./auth"));
//category:
router.use("/category", require("./category"));
//coffee:
router.use("/coffee", require("./coffee"));
//orders:
// router.use("/order", require("./order"));
//coupon:
router.use("/coupon", require("./coupon"));

/* ------------------------------------------------------- */

module.exports = router;
