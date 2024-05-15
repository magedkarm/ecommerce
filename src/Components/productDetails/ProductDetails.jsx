import React, { useContext, useEffect, useState } from "react";
import "../ReusableComp/ProductHolder/ProductHolder.css";
import axios from "axios";
import { AuthContext } from "../../context/Auth";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [displayImg, setDisplayImg] = useState(null);
  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(true); // State for loading spinner
  const { token, setWishNums, setCartNums } = useContext(AuthContext);

  async function getCart() {
    try {
      const { data } = await axios.get(
        `https://e-commerce-project-1-tvev.onrender.com/api/v1/products/${id}`
      );

      setProduct(data?.data.date);
      setDisplayImg(data?.data.date.images[0]);
      setLoading(false); // Set loading to false when request is completed
    } catch (e) {
      console.log(e);
    }
  }

  function counterMiuns() {
    if (counter > 1) setCounter(counter - 1);
  }

  // add Func
  async function addToWishList(id) {
    try {
      const { data } = await axios.post(
        `https://e-commerce-project-1-tvev.onrender.com/api/v1/wishlists`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setWishNums(data?.data.length);
      toast.success("Add to Your WishList");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

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
      setCartNums(data?.data.cart.cartItems.length);
      toast.success("Add to Your Cart");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(function () {
    getCart();
  }, []);
  return (
    <>
      {loading ? (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{
            minHeight: "620px",
          }}
        >
          <div
            className="spinner-border text-primary d-flex justify-content-between align-items-center"
            role="status"
          ></div>
        </div>
      ) : (
        <div className="productDeteils ">
          <div className="container">
            <div className="row d-flex mt-5 ">
              <div className="col-md-7 ps-5">
                <div
                  className="productDeteilsImg"
                  style={{ marginRight: "70px" }}
                >
                  <img
                    src={
                      "https://e-commerce-project-1-tvev.onrender.com/img/products/" +
                      displayImg
                    }
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      maxHeight: "620px",
                    }}
                    alt=""
                  />
                </div>
                <div className="productDeteilsImg mt-5">
                  <nav>
                    <div
                      className="nav nav-tabs justify-content-md-start justify-content-sm-between"
                      id="nav-tab"
                      role="tablist"
                    >
                      {product?.images.map((img, index) => {
                        if (index === 0) {
                          return (
                            <button
                              className="nav-link active me-4 p-0"
                              id="nav-home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-home"
                              type="button"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                              key={index}
                              onClick={() => {
                                setDisplayImg(img);
                              }}
                            >
                              <img
                                style={{
                                  width: "100%",
                                  objectFit: "cover",
                                  height: "100%",
                                }}
                                src={
                                  "https://e-commerce-project-1-tvev.onrender.com/img/products/" +
                                  img
                                }
                                alt=""
                              />
                            </button>
                          );
                        } else {
                          return (
                            <button
                              className="nav-link me-4 p-0"
                              id="nav-home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-home"
                              type="button"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                              key={index}
                              onClick={() => {
                                setDisplayImg(img);
                              }}
                            >
                              <img
                                style={{
                                  width: "100%",
                                  objectFit: "cover",
                                  height: "100%",
                                }}
                                src={
                                  "https://e-commerce-project-1-tvev.onrender.com/img/products/" +
                                  img
                                }
                                alt=""
                              />
                            </button>
                          );
                        }
                      })}
                    </div>
                  </nav>
                </div>
              </div>
              <div className="col-md-5  pe-5">
                <div className="productDeteilsDescription">
                  <h3 className="productDeteilsDescriptionTitle">
                    {product?.name}
                  </h3>
                  <p
                    className="productDeteilsDescriptionP"
                    style={{
                      overflow: "visible",
                      fontSize: "15px",
                      marginBottom: "23px",
                      lineHeight: "1.6",
                    }}
                  >
                    Shop Harry.com for every day low prices. Free shipping on
                    orders $35+ or Pickup In-store and get
                  </p>
                  <div className="price position-relative">
                    <span className="priceAmount">${product?.price}</span>
                    <span className="discount">-{product?.discount}%</span>
                  </div>
                  <div className="counter">
                    <div className="counterContent">
                      <button
                        className=" btn-miuns position-relative"
                        style={{ padding: "10px 20px" }}
                        onClick={counterMiuns}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span>{counter}</span>
                      <button
                        className=" btn-plus position-relative"
                        onClick={() => {
                          setCounter(counter + 1);
                        }}
                      >
                        <i
                          className="fa-solid fa-plus"
                          style={{ padding: "10px 20px" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="btnAction d-flex flex-wrap align-items-center">
                    <button
                      type="buttun"
                      className="addToCart text-center"
                      onClick={() => {
                        addToCart(product?._id);
                      }}
                    >
                      <i className="fa-solid fa-cart-shopping"></i> Add To Cart
                    </button>
                    <button
                      type="buttun"
                      className="addToWishList text-center"
                      onClick={() => {
                        addToWishList(product?._id);
                      }}
                    >
                      <i className="fa-regular fa-heart"></i>
                      <span>Add To Wishlist</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-10 mt-5 pt-5">
                <h2 className=" border-bottom pb-3">Description</h2>
                <p style={{ color: "#525258", fontSize: "14px" }}>
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
