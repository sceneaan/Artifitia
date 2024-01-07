// Home.jsx
import React, { useState } from "react";
import TopBar from "../Topbar/Topbar";
import SideBar from "../SideBar/SideBar";
import AddCategoryDialog from "../Dialogs/AddCategoryDialog";
import AddSubCategoryDialog from "../Dialogs/AddSubCatDialog";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import "./home.css";

const Home = () => {
  const token = localStorage.getItem("token");
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);

  const handleOpenCategoryDialog = () => {
    if (token) {
      setOpenCategoryDialog(true);
    } else {
      console.log("User not authenticated. Handle accordingly.");
    }
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  const handleOpenSubCategoryDialog = () => {
    if (token) {
      setOpenSubCategoryDialog(true);
    } else {
      console.log("User not authenticated. Handle accordingly.");
    }
  };

  const handleCloseSubCategoryDialog = () => {
    setOpenSubCategoryDialog(false);
  };

  // Example data for product list
  const productList = [
    { id: 1, name: "Product 1", price: 100, rating: 4.5 },
    { id: 2, name: "Product 2", price: 120, rating: 4.2 },
    { id: 3, name: "Product 3", price: 90, rating: 4.8 },
    // Add more products as needed
  ];

  return (
    <>
      <TopBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="button-container">
            <AddCategoryDialog
              open={openCategoryDialog}
              handleClose={handleCloseCategoryDialog}
            />
            <AddSubCategoryDialog
              open={openSubCategoryDialog}
              handleClose={handleCloseSubCategoryDialog}
            />
            <button className="button" disabled={!token}>
              Add Product
            </button>
          </div>
          <div className="product-container">
            <Grid container spacing={3}>
              {productList.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/path/to/product-image.jpg"
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <b> ${product.price}</b>
                      </Typography>
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <div className="pagination-container">
              <Pagination count={10} color="primary" className="pagination" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
