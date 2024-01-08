const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");
const { uploadImages } = require("../middleware/ImageMiddleware");

router.post(
  "/addproduct",
  verifyToken,
  uploadImages,
  productController.addProduct
);

router.post(
  "/editproduct",
  verifyToken,
  uploadImages,
  productController.editProduct
);

router.post(
  "/deleteproduct/:productId",
  verifyToken,
  productController.deleteProduct
);

router.post(
  "/deleteimage/:productId/:imageId",
  verifyToken,
  uploadImages,
  productController.deleteImageFromProduct
);

router.post("/listproducts", productController.listProducts);

router.get("/getproduct/:productId", productController.getProductById);

module.exports = router;
