import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/Auth";
import "../checkout/checkout.css";
import axios from "axios";

export default function Checkout() {
  const { token } = useContext(AuthContext);
  const [cartProduct, setCartProduct] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);
  const navigate = useNavigate();

  async function checkOurFunc(values) {
    console.log(values);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/orders/checkout-session/${cartDetails._id}`,
        values,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(data?.session.url);
      window.open(data?.session.url, "_blank");
    } catch (e) {
      console.log(e);
    }
  }
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phone: Yup.number()
      .typeError("Phone must be a number")
      .required("Phone is required"),
    shippingAddress: Yup.object().shape({
      country: Yup.string().required("Country is required"),
      governorate: Yup.string().required("Governorate is required"),
      city: Yup.string().required("City is required"),
      address: Yup.string().required("Address is required"),
      postCode: Yup.number()
        .typeError("Post Code must be a number")
        .required("Post Code is required"),
    }),
  });

  //  call Cart

  async function getCart() {
    try {
      const { data: cart } = await axios.get(
        "http://localhost:5000/api/v1/carts",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setCartProduct(cart?.data.cart.cartItems);
      setCartDetails(cart?.data.cart);
      console.log(cart?.data.cart._id);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(function () {
    getCart();
  }, []);
  let formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      shippingAddress: {
        country: "",
        governorate: "",
        city: "",
        address: "",
        postCode: "",
      },
    },
    onSubmit: checkOurFunc,
    validationSchema,
  });
  return (
    <div className="pagesUesrs">
      <section
        className="topSection  d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f1f1f1", padding: "100px 0px" }}
      >
        <div className="heaterPages ">
          <h2>Check Out</h2>
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

              <div className="billing p-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="billingDetails">
                      <div className="BillingHeader">
                        <h3>Billing Details</h3>
                      </div>
                      <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                          <div className="row billingAdd ">
                            <div className="col-md-6 ">
                              <div className="login__input">
                                <input
                                  id="firstName"
                                  name="firstName"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.firstName}
                                  type="text"
                                  placeholder="Frist Name"
                                />
                              </div>
                              {formik.errors.firstName &&
                              formik.touched.firstName ? (
                                <p style={{ color: "#7a0d0d" }}>
                                  * {formik.errors.firstName}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-md-6">
                              <div className="login__input">
                                <input
                                  id="lastName"
                                  name="lastName"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.lastName}
                                  type="text"
                                  placeholder="Last Name"
                                />
                              </div>
                              {formik.errors.lastName &&
                              formik.touched.lastName ? (
                                <p style={{ color: "#7a0d0d" }}>
                                  * {formik.errors.lastName}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-md-12 pb-3">
                              <div className="login__input">
                                <input
                                  id="phone"
                                  name="phone"
                                  onBlur={formik.handleBlur}
                                  onChange={formik.handleChange}
                                  value={formik.values.phone}
                                  type="tel"
                                  placeholder="Your Phone"
                                />
                              </div>
                              {formik.errors.phone && formik.touched.phone ? (
                                <p style={{ color: "#7a0d0d" }}>
                                  * {formik.errors.phone}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <h3 className="border-1 border-bottom">Address</h3>
                            <div className="col-md-12 pb-3">
                              <h5>Countery</h5>
                              <div className="login__input">
                                <Field
                                  placeholder="First Name"
                                  className="counterySelector"
                                  name="shippingAddress.country"
                                  value={formik.values.shippingAddress.country}
                                  onChange={formik.handleChange}
                                  as="select"
                                >
                                  <option disabled value="">
                                    Select a country
                                  </option>
                                  <option value="Egy">Egypt</option>
                                  <option value="SA">Saudi Arabia</option>
                                  <option value="UAE">
                                    United Arab Emirates
                                  </option>
                                  <option value="IRQ">Iraq</option>
                                  <option value="KWT">Kuwait</option>
                                  <option value="QAT">Qatar</option>
                                </Field>
                              </div>
                              {formik.touched.shippingAddress?.country &&
                              formik.errors.shippingAddress?.country ? (
                                <p style={{ color: "#7a0d0d" }}>
                                  * {formik.errors.shippingAddress?.country}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-md-6 pb-3">
                              <h5>Governorate</h5>
                              <div className="login__input">
                                <Field
                                  placeholder="Governorate"
                                  name="shippingAddress.governorate"
                                  value={
                                    formik.values.shippingAddress.governorate
                                  }
                                  onChange={formik.handleChange}
                                />
                              </div>
                              {formik.touched.shippingAddress?.governorate &&
                              formik.errors.shippingAddress?.governorate ? (
                                <p style={{ color: "#7a0d0d" }}>
                                  * {formik.errors.shippingAddress?.governorate}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-md-6 pb-3">
                              <h5>City</h5>
                              <div className="login__input">
                                <Field
                                  placeholder="City"
                                  name="shippingAddress.city"
                                  value={formik.values.shippingAddress.city}
                                  onChange={formik.handleChange}
                                />
                              </div>
                              {formik.touched.shippingAddress?.city &&
                              formik.errors.shippingAddress?.city ? (
                                <p style={{ color: "#7a0d0d" }}>
                                  * {formik.errors.shippingAddress?.city}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-md-12 pb-3">
                              <h5>Address</h5>
                              <div className="login__input">
                                <Field
                                  placeholder="Address"
                                  name="shippingAddress.address"
                                  value={formik.values.shippingAddress.address}
                                  onChange={formik.handleChange}
                                />
                              </div>
                              {formik.touched.shippingAddress?.address &&
                              formik.errors.shippingAddress?.address ? (
                                <p style={{ color: "#7a0d0d" }}>
                                  * {formik.errors.shippingAddress?.address}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="col-md-12 pb-3">
                              <h5>Post Code</h5>
                              <div className="login__input">
                                <Field
                                  placeholder="Post Code"
                                  name="shippingAddress.postCode"
                                  value={formik.values.shippingAddress.postCode}
                                  onChange={formik.handleChange}
                                />
                              </div>
                              {formik.touched.shippingAddress?.postCode &&
                              formik.errors.shippingAddress?.postCode ? (
                                <p style={{ color: "#7a0d0d" }}>
                                  * {formik.errors.shippingAddress?.postCode}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <button
                            type="submit"
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
                        </form>
                      </FormikProvider>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="orderDEtatails">
                      <div className="BillingHeader">
                        <h3>Order Details</h3>
                        <div className="orderItems">
                          <table className="w-100">
                            <thead>
                              <tr className="border-bottom pb-5 trTable">
                                <th>Product</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cartProduct?.map((item) => {
                                return (
                                  <tr key={item._id} className="  tbTable ">
                                    <td>
                                      {item.product.name}{" "}
                                      <span style={{ fontWeight: "700" }}>
                                        x {item.quantity}
                                      </span>
                                    </td>
                                    <td>${item.itemPrice}</td>
                                  </tr>
                                );
                              })}
                              <tr className="  tbTable ">
                                <td>Cart Subtotal</td>
                                <td>${cartDetails?.totalCartPrice}</td>
                              </tr>
                              <tr className="  tbTable ">
                                <td>Shipping</td>
                                <td>$10</td>
                              </tr>
                              <tr className="  tbTable  ">
                                <td className="border-bottom-0">Discount</td>
                                <td
                                  className="border-bottom-0"
                                  style={{
                                    color: "#F50963",
                                    fontSize: "18px",
                                    fontWeight: "500",
                                    textAlign: "start",
                                  }}
                                >
                                  $
                                  {(
                                    cartDetails?.totalCartPrice -
                                    cartDetails?.totalPriceAfterDiscount
                                  ).toFixed(1)}
                                </td>
                              </tr>
                              <tr className="  tbTable  ">
                                <td className="border-bottom-0">Order Total</td>
                                <td
                                  className="border-bottom-0"
                                  style={{
                                    color: "#F50963",
                                    fontSize: "18px",
                                    fontWeight: "500",
                                    textAlign: "start",
                                  }}
                                >
                                  ${cartDetails?.totalPriceAfterDiscount + 10}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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
