import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "../Home/home.css";
import { addCategoryApi } from "../../api/categoryApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CategoryDialog() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({
    categoryName: "",
  });

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    setCategory((prev) => ({
      ...prev,
      categoryName,
    }));
  };

  const handleAddCategory = async () => {
    try {
      const response = await addCategoryApi(category);

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        handleClose();
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      toast.error("Category adding failed", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      console.log(error.message);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <button className="button" variant="outlined" onClick={handleClickOpen}>
        Add Category
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ alignSelf: "center" }} id="alert-dialog-title">
          {"Add Category"}
        </DialogTitle>
        <DialogContent style={{ display: "flex", alignItems: "center" }}>
          <DialogContentText id="alert-dialog-description">
            <TextField
              label="Add category name"
              variant="outlined"
              margin="normal"
              style={{ width: "400px" }}
              onChange={handleCategoryChange}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ alignSelf: "center", marginBottom: "15px" }}>
          <button className="add-button" onClick={handleAddCategory}>
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