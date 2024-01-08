const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
  adminId: { type: String, required: true },
  productId: [{ type: String }],
});

const WishList = mongoose.model("wishList", wishListSchema);

module.exports = WishList;
