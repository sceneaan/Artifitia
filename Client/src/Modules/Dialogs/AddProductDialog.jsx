import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { listSubCategoryApi } from "../../api/subCategoryApi";
import { addProductApi } from "../../api/productApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDialog() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    subCategoryId: "",
    variants: [{ name: "", price: "", quantity: "" }],
    description: "",
  });
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };

  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await listSubCategoryApi();
        if (Array.isArray(response.data)) {
          setSubCategory(response.data);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSubcategoryChange = (event) => {
    const subCategoryValue = event.target.value;
    setProduct((prev) => ({
      ...prev,
      subCategoryId: subCategoryValue,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProductChange = (event) => {
    const productName = event.target.value;
    setProduct((prev) => ({
      ...prev,
      productName,
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const handleAddVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { name: "", price: "", quantity: "" }],
    }));
  };

  const handleRemoveVariant = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", product.productName);
      formData.append("subCategoryId", product.subCategoryId);
      formData.append("description", product.description);
      formData.append("variants", JSON.stringify(product.variants));

      images.forEach((image, index) => {
        formData.append("images[]", image);
      });

      const response = await addProductApi(formData);

      if (response.status === 200) {
        setImageUrls(response.data.images);

        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        handleClose();
      } else {
        toast.error(response.data.message || "Product adding failed", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <React.Fragment>
      <button className="button" variant="outlined" onClick={handleClickOpen}>
        Add Product
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ alignSelf: "center" }} id="alert-dialog-title">
          {"Add Product"}
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            <div style={{ marginBottom: "15px", width: "100%" }}>
              <TextField
                label="Title"
                variant="outlined"
                margin="normal"
                style={{ width: "100%" }}
                onChange={handleProductChange}
              />
            </div>
            {product.variants.map((variant, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "40px" }}>Variants :</div>
                <div style={{ marginRight: "10px" }}>Spec :</div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ width: "100px", marginRight: "10px" }}
                  value={variant.name}
                  onChange={(e) =>
                    handleVariantChange(index, "name", e.target.value)
                  }
                />
                <div style={{ marginRight: "10px" }}>Price :</div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ width: "100px", marginRight: "10px" }}
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                />
                <div style={{ marginRight: "10px" }}>QTY :</div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ width: "100px", marginRight: "10px" }}
                  value={variant.quantity}
                  onChange={(e) =>
                    handleVariantChange(index, "quantity", e.target.value)
                  }
                />

                {index > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    style={{
                      height: "40px",
                      marginRight: "10px",
                      border: "none",
                      top: "4px",
                    }}
                    onClick={() => handleRemoveVariant(index)}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddVariant}
              style={{
                marginTop: "5px",
                float: "inline-end",
                marginBottom: "40px",
              }}
            >
              ADD LINE
            </Button>
            <div style={{ marginBottom: "15px", width: "100%" }}>
              <Select
                value={product.subCategoryId}
                onChange={handleSubcategoryChange}
                displayEmpty
                variant="outlined"
                inputProps={{ "aria-label": "Without label" }}
                style={{ width: "100%" }}
              >
                <MenuItem value="" disabled>
                  Select Subcategory
                </MenuItem>
                {subCategory.map((subcat) => (
                  <MenuItem key={subcat._id} value={subcat._id}>
                    {subcat.subCategoryName}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ marginBottom: "15px", width: "100%" }}>
              <TextField
                label="Description"
                variant="outlined"
                margin="normal"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div style={{ marginBottom: "15px", width: "100%" }}>
              Upload images:
              <input
                style={{ marginLeft: "40px" }}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div style={{ display: "flex", marginBottom: "15px" }}>
              {imageUrls &&
                imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Uploaded ${index}`}
                    style={{
                      width: "100px",
                      height: "auto",
                      marginRight: "10px",
                    }}
                  />
                ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center", marginBottom: "15px" }}>
          <Button className="add-button" onClick={handleAddProduct}>
            ADD
          </Button>
          <Button className="discard-button" onClick={handleClose} autoFocus>
            DISCARD
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
