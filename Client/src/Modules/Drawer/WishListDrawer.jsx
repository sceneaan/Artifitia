import React from "react";
import WishListCard from "./WishListCard";

const WishListDrawer = () => {
  const wishListData = [
    {
      productId: "1",
      productName: "Product 1",
      image: "https://example.com/image1.jpg",
      price: 50,
      quantity: 2,
    },
    {
      productId: "2",
      productName: "Product 2",
      image: "https://example.com/image2.jpg",
      price: 75,
      quantity: 1,
    },
  ];

  return (
    <>
      <div style={{ width: "350px" }}>
        {wishListData.map((product) => (
          <WishListCard key={product.productId} product={product} />
        ))}
      </div>
    </>
  );
};

export default WishListDrawer;
