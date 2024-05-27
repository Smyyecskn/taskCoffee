"use strict";

const router = require("express").Router();

/* ------------------------------------------------------- */
const auth = require("../controllers/auth");

//URL :auth
// Login/logout:
router.post("/login", auth.login);
router.get("/logout", auth.logout);

/* ------------------------------------------------------- */
module.exports = router;
