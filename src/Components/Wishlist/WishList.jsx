import React, { useContext, useEffect, useState } from "react";
import "../Wishlist/wishlist.css";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";

export default function WishList() {
  const { token, setWishNums, setCartNums } = useContext(AuthContext);
  const [wishListProducts, setWishListProducts] = useState(null);
  const navigate = useNavigate();

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
      setWishListProducts(wishList?.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(function () {
    getWishlist();
  }, []);

  async function addToCart(id) {
    try {
      const { data } = await axios.post(
        `https://e-commerce-project-1-tvev.onrender.com/api/v1/carts`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      DeletefromWishList(id);
      setCartNums(data?.data.cart.cartItems.length);
      toast.success("Add to Your Cart");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function DeletefromWishList(id) {
    try {
      const { data } = await axios.delete(
        `https://e-commerce-project-1-tvev.onrender.com/api/v1/wishlists/${id}`,

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setWishNums(data?.results);
      getWishlist();

      toast.success("Remove Done..");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="pagesUesrs">
      <section
        className="topSection  d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f1f1f1", padding: "100px 0px" }}
      >
        <div className="heaterPages ">
          <h2>Wishlist</h2>
        </div>
      </section>
      <div className="pageArea">
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <div className="continueShoping mb-4">
                <Link to="/shop">
                  Continue Shopping <i className="fa-solid fa-repeat"></i>
                </Link>
              </div>
              <TableContainer className="mb-5" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Images</TableCell>
                      <TableCell align="center">Product</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Add to Your Cart</TableCell>
                      <TableCell align="center">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wishListProducts?.map((product) => (
                      <TableRow
                        key={product._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          align="center"
                          component="th"
                          scope="product"
                        >
                          <img
                            className="img-fluid "
                            style={{ width: "125px" }}
                            src={
                              "https://e-commerce-project-1-tvev.onrender.com/img/products/" +
                              product.images[0]
                            }
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="center" className="tableCell">
                          {product.name}
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          {`$` + product.price}
                        </TableCell>
                        <TableCell align="center">
                          <button
                            type="buttun"
                            className="addToCart text-center"
                            onClick={() => {
                              addToCart(product._id);
                            }}
                          >
                            <i className="fa-solid fa-cart-shopping"></i> Add To
                            Cart
                          </button>
                        </TableCell>
                        <TableCell align="center">
                          <button
                            type="buttun"
                            className="addToCart text-center bg-danger"
                            onClick={() => {
                              DeletefromWishList(product._id);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i> Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        className="p-0"
                        component="th"
                        scope="row"
                      ></TableCell>
                      <TableCell className="p-0" align="right"></TableCell>
                      <TableCell className="p-0" align="right"></TableCell>
                      <TableCell className="p-0" align="right"></TableCell>
                      <TableCell className="p-0" align="right"></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <button
                onClick={() => {
                  navigate("/cart");
                }}
                className="btn btn-dark py-3 px-5"
              >
                {" "}
                Go to Cart{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
