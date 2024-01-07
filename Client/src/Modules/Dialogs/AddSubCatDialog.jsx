import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "../Home/home.css";
import { listCategoryApi } from "../../api/categoryApi";
import { addSubCategoryApi } from "../../api/subCategoryApi";

export default function SubCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    categoryId: "",
    subCategoryName: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await listCategoryApi();
        setCategories(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSubCategory((prev) => ({
      ...prev,
      categoryId,
    }));
  };

  const handleSubCategoryNameChange = (event) => {
    const subCategoryName = event.target.value;
    setSubCategory((prev) => ({
      ...prev,
      subCategoryName,
    }));
  };

  const handleAddSubCategory = async () => {
    try {
      await addSubCategoryApi(subCategory);
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <React.Fragment>
      <button className="button" variant="outlined" onClick={handleClickOpen}>
        Add Sub Category
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ alignSelf: "center" }} id="alert-dialog-title">
          {"Add Sub Category"}
        </DialogTitle>
        <DialogContent style={{ display: "flex", alignItems: "center" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center" }}
          >
            <Select
              value={subCategory.categoryId}
              onChange={handleCategoryChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{
                width: "400px",
                marginBottom: "10px",
                textAlign: "start",
              }}
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>

            <TextField
              label="Add sub category name"
              variant="outlined"
              margin="normal"
              style={{ width: "400px" }}
              onChange={handleSubCategoryNameChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center", marginBottom: "15px" }}>
          <button className="add-button" onClick={handleAddSubCategory}>
            ADD
          </button>
          <button className="discard-button" onClick={handleClose} autoFocus>
            DISCARD
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
