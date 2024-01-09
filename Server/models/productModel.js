const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  subCategoryId: { type: String, required: true },
  description: { type: String, required: true },
  variants: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      symbol: { type: String, default: "$" },
    },
  ],
  images: { type: [imageSchema] },
  rating: { type: Number, min: 0, max: 5, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
