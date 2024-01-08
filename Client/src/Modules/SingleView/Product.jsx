import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TopBar from "../Topbar/Topbar";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { getSingleProductApi } from "../../api/productApi";

const Product = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
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

    fetchProductDetails();
  }, [productId]);

  return (
    <>
      <TopBar />
      <div style={{ padding: "20px" }}>
        <div className="product-container">
          <Breadcrumbs
            separator="›"
            aria-label="breadcrumb"
            sx={{ marginBottom: "50px" }}
          >
            <Link to="/">Home</Link>
            <Typography color="textPrimary">Product Details</Typography>
          </Breadcrumbs>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Card className="card">
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        productDetails.images &&
                        productDetails.images.length > 0
                          ? productDetails.images[0].url
                          : "/path/to/default-image.jpg"
                      }
                      alt={productDetails.productName}
                    />
                  </Card>
                </Grid>
                {productDetails.images &&
                  productDetails.images.slice(1).map((image) => (
                    <Grid item key={image._id} xs={6}>
                      <Card className="card">
                        <CardMedia
                          component="img"
                          height="140"
                          image={image.url}
                          alt={productDetails.productName}
                        />
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <Card className="card">
                <CardContent className="card-content">
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontSize: "medium" }}
                  >
                    {productDetails.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>
                      {productDetails.variants &&
                        productDetails.variants[0].symbol +
                          productDetails.variants[0].price}
                    </b>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Quantity:{" "}
                    {productDetails.variants &&
                      productDetails.variants[0].quantity}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={productDetails.rating || 0}
                    readOnly
                  />
                  <Typography variant="body2" color="text.secondary">
                    {productDetails.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Product;
