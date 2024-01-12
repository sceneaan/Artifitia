import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TopBar from "../Topbar/Topbar";
import SideBar from "../SideBar/SideBar";
import AddCategoryDialog from "../Dialogs/AddCategoryDialog";
import AddSubCategoryDialog from "../Dialogs/AddSubCatDialog";
import AddProductDialog from "../Dialogs/AddProductDialog";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import "./home.css";
import { listProductApi } from "../../api/productApi";

const Home = () => {
  const token = localStorage.getItem("token");
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openSubCategoryDialog, setOpenSubCategoryDialog] = useState(false);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };

  const handleCloseSubCategoryDialog = () => {
    setOpenSubCategoryDialog(false);
  };

  const handleProductDialog = () => {
    setOpenProductDialog(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSubcategoryChange = (subcategoryId) => {
    const updatedSelectedSubcategories = [...selectedSubcategories];
    const index = updatedSelectedSubcategories.indexOf(subcategoryId);

    if (index !== -1) {
      updatedSelectedSubcategories.splice(index, 1);
    } else {
      updatedSelectedSubcategories.push(subcategoryId);
    }

    setSelectedSubcategories(updatedSelectedSubcategories);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await listProductApi({
          subCategoryList: selectedSubcategories,
          index: currentPage - 1,
          search: searchQuery,
        });

        if (response.status === 200) {
          if (response.data.list.length === 0) {
            console.log("Product list is empty");
          } else {
            setProductList(response.data.list);
            setTotalPages(response.data.pages);
          }
        } else {
          console.error("Error fetching product list:", response.data);
        }
      } catch (error) {
        console.error("Error fetching product list:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedSubcategories, searchQuery]);

  return (
    <>
      <TopBar onSearch={handleSearch} />
      <div style={{ display: "flex" }}>
        <SideBar onSubcategoryChange={handleSubcategoryChange} />
        <div style={{ flex: 1, padding: "20px" }}>
          <div className="button-container">
            <AddCategoryDialog
              open={openCategoryDialog}
              handleClose={handleCloseCategoryDialog}
              disabled={!token}
            />
            <AddSubCategoryDialog
              open={openSubCategoryDialog}
              handleClose={handleCloseSubCategoryDialog}
              disabled={!token}
            />
            <AddProductDialog
              open={openProductDialog}
              handleClose={handleProductDialog}
              disabled={!token}
            />
          </div>
          <div className="product-container">
            {loading ? (
              <div className="loader-container">
                <CircularProgress />
              </div>
            ) : (
              <>
                <Grid container spacing={3}>
                  {productList.map((product) => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                      <Link
                        to={`/product/${product._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Card className="card">
                          <CardMedia
                            component="img"
                            style={{ height: "100%" }}
                            image={
                              product.images.length > 0
                                ? product.images
                                : "/path/to/default-image.jpg"
                            }
                            alt={product.productName}
                          />
                          <CardContent className="card-content">
                            <Typography
                              variant="h5"
                              component="div"
                              style={{ fontSize: "medium" }}
                            >
                              {product.productName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <b>$ {product.variants[0].price}</b>
                            </Typography>
                            <Rating
                              name="read-only"
                              value={product.totalRating}
                              readOnly
                            />
                          </CardContent>
                        </Card>
                      </Link>
                    </Grid>
                  ))}
                </Grid>

                <div className="pagination-container">
                  <Pagination
                    count={totalPages}
                    color="warning"
                    page={currentPage}
                    onChange={handlePageChange}
                    className="pagination"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
