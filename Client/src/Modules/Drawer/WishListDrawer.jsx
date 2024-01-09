import React, { useState, useEffect } from "react";
import WishListCard from "./WishListCard";
import { listWishListApi } from "../../api/wishlistApi";

const WishListDrawer = () => {
  const [wishListData, setWishListData] = useState([]);

  useEffect(() => {
    const fetchWishListData = async () => {
      try {
        const adminId = localStorage.getItem("adminId");

        if (!adminId) {
          console.error("AdminId not available");
          return;
        }

        const response = await listWishListApi({ adminId });

        if (response.status === 200) {
          setWishListData(response.data);
        } else {
          console.error("Error fetching wishlist data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching wishlist data:", error.message);
      }
    };

    fetchWishListData();
  }, []);

  return (
    <>
    <h2>Wishlist</h2>
      <div style={{ width: "350px", margin:'20px' }}>
        {wishListData.map((product) => (
          <WishListCard key={product.productId} productId={product.productId} />
        ))}
      </div>
    </>
  );
};

export default WishListDrawer;
