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
      ram: { type: String, required: true },
      price: {
        value: { type: Number, required: true },
        symbol: { type: String, default: "$" },
      },
      quantity: { type: Number, required: true },
    },
  ],
  images: { type: [imageSchema], required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
