const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/addproduct", verifyToken, productController.addProduct);
router.post("/editproduct", verifyToken, productController.editProduct);
router.post(
  "/deleteproduct/:productId",
  verifyToken,
  productController.deleteProduct
);
router.post(
  "/deleteimage/:productId/:imageId",
  verifyToken,
  productController.deleteImageFromProduct
);

router.post("/listproducts", productController.listProducts);

module.exports = router;
