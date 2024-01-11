import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TopBar from "../Topbar/Topbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Breadcrumbs,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import EditProductDialog from "../Dialogs/EditProductDialog";
import { getSingleProductApi, editProductApi } from "../../api/productApi";
import {
  addWishlistApi,
  removeWishlistApi,
  listWishListApi,
} from "../../api/wishlistApi";

const Product = () => {
  const token = localStorage.getItem("token");
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState({
    rating: [{ value: 2 }],
  });

  useEffect(() => {
    const fetchAdminId = () => {
      const storedAdminId = localStorage.getItem("adminId");
      if (storedAdminId) {
        setAdminId(storedAdminId);
      }
    };

    fetchAdminId();

    const fetchProductDetails = async () => {
      try {
        const response = await getSingleProductApi(productId);

        if (response.status === 200) {
          setProductDetails(response.data.data);
        } else {
          console.error("Error fetching product details:", response.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error.message);
      }
    };

    const checkWishlistStatus = async () => {
      try {
        const response = await listWishListApi(productId);
        setIsInWishlist(response.data.isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist status:", error.message);
      }
    };

    fetchProductDetails();
    checkWishlistStatus();
  }, [productId]);

  const handleRateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("productId", productId);
      formData.append("rating", product.rating[0].value);

      const response = await editProductApi(productId, formData);

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "toast",
        });
        setProduct((prevProduct) => ({
          ...prevProduct,
          rating: [{ value: newValue }],
        }));
        // setTimeout(() => {
        //   window.location.href = `/product/${productId}`;
        // }, 1000);
      } else {
        toast.error(response.data.message || "Failed to rate the product", {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "toast",
        });
      }
    } catch (error) {
      toast.error(error.message || "Failed to rate the product", {
        position: toast.POSITION.BOTTOM_CENTER,
        toastId: "toast",
      });
      console.error(error.message);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const getTotalQuantity = () => {
    if (productDetails.variants) {
      return productDetails.variants.reduce(
        (total, variant) => total + variant.quantity,
        0
      );
    }
    return 0;
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value));
  };

  const handleWishlistClick = async () => {
    try {
      if (!token) {
        toast.error("You need to login first", {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "toast",
        });
        return;
      }
      if (isInWishlist) {
        await removeWishlistApi(productId);
        toast.success("Removed from wishlist", {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "toast",
        });
      } else {
        await addWishlistApi(productId);
        toast.success("Added to wishlist", {
          position: toast.POSITION.BOTTOM_CENTER,
          toastId: "toast",
        });
      }
      setIsInWishlist((prevIsInWishlist) => !prevIsInWishlist);
    } catch (error) {
      console.error("Error updating wishlist:", error.message);
    }
  };

  return (
    <>
      <TopBar />
      <div style={{ padding: "40px" }}>
        <div className="product-container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            sx={{ marginBottom: "20px" }}
          >
            <Link to="/">Home</Link>
            <Typography color="textPrimary">Product Details</Typography>
          </Breadcrumbs>

          <div style={{ padding: "60px" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <Card className="card">
                  <img
                    src={
                      productDetails.images && productDetails.images.length > 0
                        ? productDetails.images[0].url
                        : ImageNotSupportedOutlinedIcon
                    }
                    alt={productDetails.productName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Card className="card">
                  <CardContent className="card-content">
                    <Typography
                      variant="h4"
                      component="div"
                      style={{ marginBottom: "10px" }}
                    >
                      {productDetails.productName}
                    </Typography>
                    <Typography variant="h5" color="textSecondary" gutterBottom>
                      {productDetails.variants &&
                        productDetails.variants[0].symbol +
                          productDetails.variants[0].price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      Availability:{" "}
                      {getTotalQuantity() > 0 ? (
                        <>
                          <CheckIcon
                            style={{ color: "green", paddingTop: "10px" }}
                          />
                          In stock
                        </>
                      ) : (
                        <>
                          <ClearIcon
                            style={{ color: "red", paddingTop: "10px" }}
                          />
                          Out of stock
                        </>
                      )}
                    </Typography>
                    {getTotalQuantity() < 100 && (
                      <Typography variant="body2" color="error" paragraph>
                        Hurry up! Only {getTotalQuantity()} product left in
                        stock!
                      </Typography>
                    )}
                    <Rating
                      name="simple-controlled"
                      value={product.rating[0].value}
                      onChange={(event, newValue) =>
                        handleRateProduct(newValue)
                      }
                      // onClick={handleRateProduct}
                    />
                    <Divider style={{ margin: "20px 0" }} />
                    <Typography variant="body1" paragraph>
                      {productDetails.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      Quantity:{" "}
                      <IconButton
                        color="primary"
                        onClick={() => handleQuantityChange(quantity - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      {quantity}
                      <IconButton
                        color="primary"
                        onClick={() => handleQuantityChange(quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Typography>
                    <Grid
                      container
                      spacing={2}
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item>
                        <EditProductDialog
                          productId={productId}
                          productDetails={productDetails}
                          isEditing={isEditing}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ borderRadius: "20px" }}
                        >
                          Buy Now
                        </Button>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="warning"
                          onClick={handleWishlistClick}
                        >
                          {isInWishlist ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderOutlinedIcon />
                          )}
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={6} md={6}>
                    <Card className="card">
                      <img
                        src={
                          productDetails.images &&
                          productDetails.images.length > 1
                            ? productDetails.images[1].url
                            : ImageNotSupportedOutlinedIcon
                        }
                        alt={productDetails.productName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6}>
                    <Card className="card">
                      <img
                        src={
                          productDetails.images &&
                          productDetails.images.length > 2
                            ? productDetails.images[2].url
                            : ImageNotSupportedOutlinedIcon
                        }
                        alt={productDetails.productName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
