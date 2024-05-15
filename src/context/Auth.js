import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvidor({ children }) {
  const [token, setToken] = useState(null);
  const [cartNums, setCartNums] = useState(0);
  const [wishNums, setWishNums] = useState(0);

  async function getCart() {
    try {
      const { data: cart } = await axios.get(
        "https://e-commerce-project-1-tvev.onrender.com/api/v1/carts",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (cart?.data.cart.cartItems.length > 0) {
        setCartNums(cart?.data.cart.cartItems.length);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getWishlist() {
    try {
      const { data: wishList } = await axios.get(
        "https://e-commerce-project-1-tvev.onrender.com/api/v1/wishlists",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (wishList?.data.length > 0) {
        setWishNums(wishList?.data.length);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(
    function () {
      getCart();
      getWishlist();
      if (localStorage.getItem("token") !== null) {
        setToken(localStorage.getItem("token"));
      }
    },
    [token, cartNums, wishNums]
  );
  return (
    <AuthContext.Provider
      value={{ token, setToken, cartNums, wishNums, setCartNums, setWishNums }}
    >
      {children}
    </AuthContext.Provider>
  );
}
