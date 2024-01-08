import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const WishListCard = ({ product }) => {
  return (
    <Card>
      <Grid container spacing={2}>
        {/* Left side: Image */}
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="140"
            image={product.image} // Replace with the actual image URL from the product
            alt={product.productName}
          />
        </Grid>

        {/* Right side: Details */}
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h6" component="div">
              {product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Price: $${product.price}`} {/* Replace with the actual price */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Quantity: ${product.quantity}`}{" "}
              {/* Replace with the actual quantity */}
            </Typography>
            {/* Add more details as needed */}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WishListCard;
