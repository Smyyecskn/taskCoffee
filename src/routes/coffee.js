"use strict";

const router = require("express").Router();
/* ------------------------------------------------------- */
const coffee = require("../controllers/coffee");
// const { isAdmin,isLogin } = require("../middlewares/permissions");

// router.route("/").get(coffee.list).post(isAdmin, coffee.create);

// router
//   .route("/:id")
//   .get(coffee.read)
//   .put(isAdmin, coffee.update)
//   .patch(isAdmin, coffee.update)
//   .delete(isAdmin, coffee.delete);

router.route("/").get(coffee.list).post(coffee.create);
router
    .route("/:id")
    .get(coffee.read)
    .put(coffee.update)
    .patch(coffee.update)
    .delete(coffee.delete);
/* ------------------------------------------------------- */
module.exports = router;
