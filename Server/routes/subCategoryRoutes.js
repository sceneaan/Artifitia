const express = require("express");
const router = express.Router();
const subCategoryController = require("../controllers/subCategoryController");
const verifyToken = require("../middleware/authMiddleware");

router.post(
  "/addsubcategory",
  verifyToken,
  subCategoryController.addSubCategory
);

router.post(
  "/editsubcategory",
  verifyToken,
  subCategoryController.editSubCategory
);

router.post(
  "/deletesubcategory/:subCategoryId",
  verifyToken,
  subCategoryController.deleteSubCategory
);

router.post("/listsubcategories", subCategoryController.listSubCategories);

module.exports = router;