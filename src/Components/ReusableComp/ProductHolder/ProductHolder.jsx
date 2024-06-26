import React, { useContext, useState } from "react";
import "../ProductHolder/ProductHolder.css";
import axios from "axios";
import { AuthContext } from "../../../context/Auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ProductHolder({ product }) {
  const [clickQuickVeiw, setClickQuickVeiw] = useState(false);
  const [productDetails, setproductDetails] = useState(null);
  const [displayImg, setDisplayImg] = useState(null);
  const [counter, setCounter] = useState(1);
  const { token, setWishNums, setCartNums } = useContext(AuthContext);

  async function getProductDetails(id) {
    const { data } = await axios.get(
      `https://e-commerce-project-1-tvev.onrender.com/api/v1/products/` + id
    );
    setproductDetails(data?.data.date);
    setDisplayImg(data?.data.date.images[0]);
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

  return (
    <>
      <div className="col-xl-4 col-lg-4 col-sm-6">
        <div className="product-holder position-relative overflow-hidden">
          <div className="productImg position-relative overflow-hidden  ">
            <Link
              style={{ color: "#000" }}
              to={`/ProductDeteals/${product._id}`}
            >
              <img
                className="img-fluid"
                src={
                  "https://e-commerce-project-1-tvev.onrender.com/img/products/" +
                  product.images[0]
                }
                alt=""
              />
            </Link>
            <div className="DiscountPacket">
              {product.discount > 0 ? <span>-${product.discount}%</span> : null}
            </div>
            <div className="addCart">
              <button
                className="text-center text-white"
                onClick={() => {
                  addToCart(product._id);
                }}
              >
                <h4 className="text-white">
                  add to cart <i className="fa-solid fa-cart-shopping"></i>{" "}
                </h4>
              </button>
            </div>
          </div>
          <div className="productHiddenSection">
            <div className="sideSection">
              <ul className=" listAction">
                <button
                  onClick={() => {
                    addToWishList(product._id);
                  }}
                >
                  <li>
                    <i className="fa-solid fa-heart"></i>
                  </li>
                </button>
                <button
                  onClick={() => {
                    setClickQuickVeiw(true);
                    getProductDetails(product._id);
                  }}
                >
                  <li>
                    <i className="fa-solid fa-eye"></i>
                  </li>
                </button>
                <button
                  onClick={() => {
                    addToCart(product._id);
                  }}
                >
                  <li>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </li>
                </button>
              </ul>
            </div>
          </div>

          <div className="productDiteals">
            <h4>{product.name}</h4>
            <h4>${product.price}</h4>
          </div>
        </div>
      </div>
      {productDetails ? (
        <div
          className={!clickQuickVeiw ? "badyOverlay" : "badyOverlay visible"}
        >
          <div className=" modal active quickView">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="productDeteils ">
                  <div className="productDeteilsClose">
                    <button
                      onClick={() => {
                        setClickQuickVeiw(false);
                      }}
                      className="btn "
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div className="row d-flex mt-5 ">
                    <div className="col-md-6 ps-5">
                      <div className="productDeteilsImg">
                        <img
                          src={
                            "https://e-commerce-project-1-tvev.onrender.com/img/products/" +
                            displayImg
                          }
                          style={{
                            width: "100%",
                            objectFit: "cover",
                            maxHeight: "480px",
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
                    <div className="col-md-6  pe-5">
                      <div className="productDeteilsDescription">
                        <h3 className="productDeteilsDescriptionTitle">
                          {product.name}
                        </h3>
                        <p className="productDeteilsDescriptionP">
                          {product.description}
                        </p>
                        <div className="price position-relative">
                          <span className="priceAmount">${product.price}</span>
                          <span className="discount">-{product.discount}%</span>
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
                              addToCart(product._id);
                            }}
                          >
                            <i className="fa-solid fa-cart-shopping"></i> Add To
                            Cart
                          </button>
                          <button
                            type="buttun"
                            className="addToWishList text-center"
                            onClick={() => {
                              addToWishList(product._id);
                            }}
                          >
                            <i className="fa-regular fa-heart"></i>
                            <span>Add To Wishlist</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overlayBack"></div>
        </div>
      ) : null}
    </>
  );
}
