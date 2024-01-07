const Category = require("../models/categoryModel");

async function addCategory(req, res) {
  const { categoryName } = req.body;

  try {
    if (!categoryName || categoryName === "") {
      return res.status(400).json({ message: "Category name not entered" });
    }

    const existingCategory = await Category.findOne({ categoryName });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ categoryName });
    await newCategory.save();

    res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function editCategory(req, res) {
  const { categoryId, newCategoryName } = req.body;

  try {
    if (!newCategoryName || newCategoryName === "") {
      return res.status(400).json({ message: "New category name not entered" });
    }

    const categoryToUpdate = await Category.findById(categoryId);

    if (!categoryToUpdate) {
      return res.status(404).json({ message: "Category not found" });
    }

    const existingCategory = await Category.findOne({
      categoryName: newCategoryName,
    });

    if (existingCategory) {
      return res
        .status(400)
        .json({ message: "Category with the new name already exists" });
    }

    categoryToUpdate.categoryName = newCategoryName;
    await categoryToUpdate.save();

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteCategory(req, res) {
  const { categoryId } = req.params;

  try {
    if (!categoryId || categoryId === "") {
      return res.status(400).json({ message: "Category ID not provided" });
    }

    const categoryToDelete = await Category.findByIdAndDelete(categoryId);

    if (!categoryToDelete) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function listCategories(req, res) {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(400).json({ message: "Category is empty" });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addCategory,
  editCategory,
  deleteCategory,
  listCategories,
};