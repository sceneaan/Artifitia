const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/addcategory", verifyToken, categoryController.addCategory);

router.post("/editcategory", verifyToken, categoryController.editCategory);

router.post(
  "/deletecategory/:categoryId",
  verifyToken,
  categoryController.deleteCategory
);

router.post("/listcategories", categoryController.listCategories);

module.exports = router;
