import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "../../context/Auth";

export let CartContext = createContext();

export function CartContextProvider({ children }) {
  let [cartNums, setCartNums] = useState(0);
  let [cartId, setCartId] = useState(null);
  const { token } = useContext(AuthContext);

  let headers = { AUTHORIZATION: "Bearer " + token };
  let BaseUrl = "https://e-commerce-project-1-tvev.onrender.com";
  //add to cart

  function addCart(productId) {
    return axios
      .post(`${BaseUrl}/api/v1/cart`, { productId }, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  //get cart data
  function getCart() {
    return axios
      .get(`${BaseUrl}/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  //delete ite,
  function deleteCart(id) {
    return axios
      .delete(`${BaseUrl}/api/v1/cart/${id}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  //update count
  function updateCart(id, count) {
    return axios
      .patch(`${BaseUrl}/api/v1/carts/${id}`, { count }, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  //checkout

  function checkout(id, shippingAddress) {
    return axios
      .post(
        `${BaseUrl}/api/v1/orders/checkout-session/${id}`,
        { shippingAddress },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  return;
  <CartContext.Provider
    value={{
      cartId,
      setCartId,
      addCart,
      getCart,
      deleteCart,
      updateCart,
      cartNums,
      setCartNums,
      checkout,
    }}
  >
    {children}
  </CartContext.Provider>;
}
