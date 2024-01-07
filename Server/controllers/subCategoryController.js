const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/categoryModel");

async function addSubCategory(req, res) {
  const { subCategoryName, categoryId } = req.body;

  try {
    if (!subCategoryName || subCategoryName === "") {
      return res.status(400).json({ message: "Subcategory name not entered" });
    }
    if (!categoryId || categoryId === "") {
      return res.status(400).json({ message: "Category not selected" });
    }
    const existingSubCategory = await SubCategory.findOne({ subCategoryName });

    if (existingSubCategory) {
      return res.status(400).json({ message: "Subcategory already exists" });
    }

    const categoryExists = await Category.findById(categoryId);

    if (!categoryExists) {
      return res.status(404).json({ message: "Selected category not found" });
    }

    const newSubCategory = new SubCategory({ subCategoryName, categoryId });
    await newSubCategory.save();

    res.status(200).json({ message: "Subcategory created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function editSubCategory(req, res) {
  const { subCategoryId, subCategoryName, categoryId } = req.body;

  try {
    const subCategoryToUpdate = await SubCategory.findById(subCategoryId);

    if (!subCategoryToUpdate) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    const existingSubCategory = await SubCategory.findOne({
      subCategoryName: subCategoryName,
    });

    if (existingSubCategory) {
      return res
        .status(400)
        .json({ message: "Subcategory with the new name already exists" });
    }

    if (subCategoryName) {
      subCategoryToUpdate.subCategoryName = subCategoryName;
    }
    if (categoryId) {
      const categoryExists = await Category.findById(categoryId);

      if (!categoryExists) {
        return res.status(404).json({ message: "Selected category not found" });
      }
      subCategoryToUpdate.categoryId = categoryId;
    }

    await subCategoryToUpdate.save();

    res.status(200).json({ message: "Subcategory updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteSubCategory(req, res) {
  const { subCategoryId } = req.params;

  try {
    if (!subCategoryId || subCategoryId === "") {
      return res.status(400).json({ message: "Category ID not provided" });
    }

    const subCategoryToDelete = await SubCategory.findByIdAndDelete(
      subCategoryId
    );
    if (!subCategoryToDelete) {
      return res
        .status(404)
        .json({ message: "Subcategory not found to delete" });
    }
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function listSubCategories(req, res) {
  try {
    const subcategories = await SubCategory.find();
    if (subcategories.length === 0) {
      res.status(400).json({ message: "Subcategory is empty" });
    }
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addSubCategory,
  editSubCategory,
  deleteSubCategory,
  listSubCategories,
};