const WishList = require("../models/wishListModel");

async function addWishlist(req, res) {
  const { adminId, productId } = req.body;

  try {
    if (!adminId || adminId === "" || !productId || productId === "") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const existingWishlist = await WishList.findOne({ adminId });

    if (!existingWishlist) {
      const newWishlist = new WishList({ adminId, productIds: [productId] });
      await newWishlist.save();
      return res.status(200).json({ message: "Wishlist created successfully" });
    }

    if (existingWishlist.productIds.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product already in the wishlist" });
    }

    existingWishlist.productIds.push(productId);
    await existingWishlist.save();

    res
      .status(200)
      .json({ message: "Product added to the wishlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function removeWishlist(req, res) {
  const { adminId, productId } = req.body;

  try {
    if (!adminId || adminId === "" || !productId || productId === "") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const existingWishlist = await WishList.findOne({ adminId });

    if (!existingWishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (!existingWishlist.productIds.includes(productId)) {
      return res.status(400).json({ message: "Product not in the wishlist" });
    }

    existingWishlist.productIds = existingWishlist.productIds.filter(
      (id) => id !== productId
    );

    await existingWishlist.save();

    res
      .status(200)
      .json({ message: "Product removed from the wishlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addWishlist,
  removeWishlist,
};