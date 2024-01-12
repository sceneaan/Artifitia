import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import { listWishListApi } from "../../api/wishlistApi";

const WishListCard = ({ productId }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const adminId = localStorage.getItem("adminId");

        if (!adminId) {
          console.error("AdminId not available");
          return;
        }

        const response = await listWishListApi({ adminId, productId });

        if (response.status === 200) {
          setProductDetails(response.data);
        } else {
          console.error("Error fetching wishlist item details:", response);
        }
      } catch (error) {
        console.error("Error fetching wishlist item details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="140"
            image={
              !loading && productDetails[0]?.images
                ? productDetails[0].images
                : "/path/to/default-image.jpg"
            }
            alt={!loading ? productDetails[0]?.productName : "Product Name"}
          />
        </Grid>

        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h6" component="div">
              {!loading ? productDetails[0]?.productName : "Loading..."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Price: ${
                !loading && productDetails[0]?.variants
                  ? `${productDetails[0].variants[0]?.symbol || "-"}${
                      productDetails[0].variants[0]?.price || "-"
                    }`
                  : "-"
              }
              `}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Rating
                name="read-only"
                value={!loading ? productDetails[0]?.rating || 0 : 0}
                readOnly
              />
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WishListCard;
