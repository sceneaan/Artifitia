const express = require("express");
const router = express.Router();
const wishListController = require("../controllers/wishListController");

router.post("/addwishlist", wishListController.addWishlist);

router.post("/removewishlist", wishListController.removeWishlist);

module.exports = router;
