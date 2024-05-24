"use strict";

const router = require("express").Router();
/* ------------------------------------------------------- */

const user = require("../controllers/user");
// const permissions = require("../middlewares/permissions");

//URL:/users
// router.route("/").get( user.list).post(user.create);
// router
//   .route("/:id")
//   .get(permissions.isLogin, user.read)
//   .put(permissions.isLogin, user.update)
//   .patch(permissions.isLogin, user.update)
//   .delete(permissions.isAdmin, user.delete);

router.route("/").get(user.list).post(user.create);
router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);

/* ------------------------------------------------------- */
module.exports = router;
