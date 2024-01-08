import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const WishListCard = ({ product }) => {
  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            height="140"
            image={product.image} 
            alt={product.productName}
          />
        </Grid>

        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h6" component="div">
              {product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Price: $${product.price}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Quantity: ${product.quantity}`}{" "}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default WishListCard;
