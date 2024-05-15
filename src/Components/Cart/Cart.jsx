import React, { useContext, useEffect, useState } from "react";

// import { useQuery } from "react-query";
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

export default function Cart() {
  const { token, setCartNums } = useContext(AuthContext);
  const [cartProduct, setCartProduct] = useState(null);
  const navigate = useNavigate();
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

      setCartProduct(cart?.data.cart);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(function () {
    getCart();
  }, []);

  async function DeleteFromCart(id) {
    try {
      const { data } = await axios.delete(
        `https://e-commerce-project-1-tvev.onrender.com/api/v1/carts/${id}`,
        // {
        //   productId: id,
        // },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getCart();
      setCartNums(data?.numOfCartItems);
      toast.success("Remove done");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function updateQuntity(id, quantity) {
    try {
      const { data } = await axios.patch(
        `https://e-commerce-project-1-tvev.onrender.com/api/v1/carts/${id}`,
        {
          quantity: quantity,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getCart();

      toast.success("Remove done");
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
          <h2>Cart</h2>
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
                      <TableCell align="center">Unit Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Total</TableCell>
                      <TableCell align="center">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartProduct?.cartItems.map((product) => (
                      <TableRow
                        key={product.product._id}
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
                              product.product.images[0]
                            }
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="center" className="tableCell">
                          {product.product.name}
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          {`$` + product.product.price}
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          <div className="quantity">
                            <button
                              onClick={() => {
                                updateQuntity(
                                  product._id,
                                  product.quantity - 1
                                );
                              }}
                              className="quantityBTn"
                            >
                              <i className="fa-solid fa-minus "></i>
                            </button>
                            {product.quantity}
                            <button
                              onClick={() => {
                                updateQuntity(
                                  product._id,
                                  product.quantity + 1
                                );
                              }}
                              className="quantityBTn"
                            >
                              <i className="fa-solid fa-plus "></i>
                            </button>
                          </div>
                        </TableCell>
                        <TableCell className="tableCell" align="center">
                          {`$` + product.quantity * product.product.price}
                        </TableCell>

                        <TableCell align="center">
                          <button
                            type="buttun"
                            className="addToCart text-center bg-danger"
                            onClick={() => {
                              DeleteFromCart(product._id);
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
              <div className="detailsCart">
                <div className="row justify-content-end">
                  <div className="col-md-4">
                    <h3>Cart Totals</h3>
                    <ul className="mb-5">
                      <li>
                        <div className="priceDetails d-flex justify-content-between">
                          <span>Total Cart Price</span>
                          <span>{`$` + cartProduct?.totalCartPrice}</span>
                        </div>
                      </li>
                      <li>
                        <div className="d-flex justify-content-between">
                          <span>Total Price After Discount</span>
                          <span>
                            {`$` + cartProduct?.totalPriceAfterDiscount}
                          </span>
                        </div>
                      </li>
                    </ul>
                    <button
                      onClick={() => {
                        navigate("/checkout");
                      }}
                      className="btn btn-dark py-3 px-5 outlinr"
                      style={{
                        backgroundColor: "#f50963",
                        border: "0",
                        fontSize: "20px",
                        fontWeight: "600",
                        borderRadius: "0",
                      }}
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
