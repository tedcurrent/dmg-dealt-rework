"use strict";

const express = require("express");
const router = express.Router();

// GET app page
router.get("*", (req, res, next) => {
	res.render("index", { title: "DMGDealt" });
});

module.exports = router;
