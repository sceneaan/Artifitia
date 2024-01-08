const WishList = require("../models/wishListModel");
const { Product } = require("../models/productModel");

async function addWishlist(req, res) {
  const { adminId, productId } = req.body;

  try {
    if (!adminId || adminId === "" || !productId || productId === "") {
      return res.status(400).json({ message: "Invalid input data" });
    }
    const existingProduct = await Product.findOne({ _id: productId });
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingWishlist = await WishList.findOne({ adminId });

    if (!existingWishlist) {
      const newWishlist = new WishList({ adminId, productIds: [productId] });
      await newWishlist.save();
      return res.status(200).json({ message: "Wishlist created successfully" });
    }

    existingWishlist.productId.push(productId);
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

    if (!existingWishlist.productId.includes(productId)) {
      return res.status(400).json({ message: "Product not in the wishlist" });
    }

    existingWishlist.productId = existingWishlist.productId.filter(
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

async function listWishlist(req, res) {
  const { adminId, productId } = req.query;

  try {
    if (!adminId || adminId === "" || !productId || productId === "") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const existingWishlist = await WishList.findOne({ adminId });

    if (!existingWishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (!existingWishlist.productId.includes(productId)) {
      return res.status(400).json({ message: "Product not in the wishlist" });
    }

    const productDetails = await Product.findOne({ _id: productId });

    if (!productDetails) {
      return res.status(404).json({ message: "Product details not found" });
    }

    const wishlistItem = {
      productId: productDetails._id,
      productName: productDetails.productName,
    };

    res
      .status(200)
      .json({ message: "Wishlist item fetched successfully", wishlistItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addWishlist,
  removeWishlist,
  listWishlist,
};
