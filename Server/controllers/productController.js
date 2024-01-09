const { Product } = require("../models/productModel");

async function addProduct(req, res) {
  try {
    console.log(req.body)
    const { productName, subCategoryId, description, variants, rating } =
      req.body;

    const images = req.files
      ? req.files.map((file) => ({ url: file.path }))
      : [];

    const newProduct = new Product({
      productName,
      subCategoryId,
      description,
      variants: JSON.parse(variants),
      rating,
      images: req.files?.map((file) => ({ url: file.path })) || [],
    });

    await newProduct.save();

    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function editProduct(req, res) {
  try {
    const {
      productId,
      productName,
      subCategoryId,
      description,
      variants,
      rating,
    } = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    existingProduct.productName = productName || existingProduct.productName;
    existingProduct.subCategoryId =
      subCategoryId || existingProduct.subCategoryId;
    existingProduct.description = description || existingProduct.description;
    existingProduct.variants = variants || existingProduct.variants;

    if (rating !== undefined) {
      existingProduct.rating.push(rating);

      const totalRating = existingProduct.rating.reduce((sum, r) => sum + r, 0);
      const averageRating = totalRating / existingProduct.rating.length;

      existingProduct.rating = averageRating;
    }

    await existingProduct.save();

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteImageFromProduct(req, res) {
  try {
    const { productId, imageId } = req.params;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedImages = existingProduct.images.filter(
      (image) => image._id.toString() !== imageId
    );

    existingProduct.images = updatedImages;

    await existingProduct.save();

    res.status(200).json({ message: "Image deleted from the product" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function listProducts(req, res) {
  try {
    let filter = {};

    let index = 0;
    if (req.body.index != undefined) {
      index = parseInt(req.body.index) * 6;
    }

    if (
      Array.isArray(req.body.subCategoryList) &&
      req.body.subCategoryList.length > 0
    ) {
      filter.subCategoryId = { $in: req.body.subCategoryList };
    }

    const products = await Product.find(filter);
    if (products.length > 0) {
      for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if (Array.isArray(element.images) && element.images.length > 0) {
          element._doc[
            "images"
          ] = `${process.env.FILEURL}${element.images[0].url}`;
        }
      }
      let response;
      if (req.body.search) {
        const searchValue = req.body.search.toLowerCase();
        const filteredproducts = products.filter((bill) => {
          const keysToSearch = ["productName"];
          return keysToSearch.some((key) => {
            const value = bill._doc[key];
            return (
              typeof value === "string" &&
              value.toLowerCase().includes(searchValue)
            );
          });
        });
        const totalRecords = filteredproducts.length;
        const totalPages = Math.ceil(totalRecords / 6);
        const startIndex = index;
        const endIndex = startIndex + 6;
        const paginatedEntries = filteredproducts.slice(startIndex, endIndex);

        if (!paginatedEntries.length > 0) {
          response = {
            data: "Products not found",
            status: 400,
          };
        } else {
          let SearchedDatas = {
            list: paginatedEntries,
            pages: totalPages,
          };
          response = {
            data: SearchedDatas,
            status: 200,
          };
        }
      } else {
        const totalRecords = products.length;
        const totalPages = Math.ceil(totalRecords / 6);
        const startIndex = index;
        const endIndex = startIndex + 6;
        const paginatedEntries = products.slice(startIndex, endIndex);
        if (!paginatedEntries.length > 0) {
          response = {
            data: "Products not found",
            status: 400,
          };
        } else {
          let nonSearchedDatas = {
            list: paginatedEntries,
            pages: totalPages,
          };
          response = {
            data: nonSearchedDatas,
            status: 200,
          };
        }
      }
      res.status(response.status).json(response.data);
    } else {
      res.status(500).json({ message: "Product list is empty" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getProductById(req, res) {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    for (let i = 0; i < product.images.length; i++) {
      const element = product.images[i];
      element.url = `${process.env.FILEURL}${element.url}`;
    }
    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  addProduct,
  editProduct,
  deleteProduct,
  deleteImageFromProduct,
  listProducts,
  getProductById,
};
