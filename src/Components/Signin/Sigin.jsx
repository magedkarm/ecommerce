import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Hourglass } from "react-loader-spinner";
import { AuthContext } from "../../context/Auth";
function Sigin() {
  const [errorMsg, seterrorMsg] = useState(null);
  const [successMsg, setsuccessMsgMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  async function submitLogin(values) {
    setLoading(true);
    const { data } = await axios
      .post(
        "https://e-commerce-project-1-tvev.onrender.com/api/v1/users/login",
        values
      )
      .catch(function (error) {
        setsuccessMsgMsg(null);
        setLoading(false);
        seterrorMsg(error.response.data.message);
      });
    if (data.status) {
      localStorage.setItem("token", data.token);
      authContext.setToken(data.token);
      seterrorMsg(null);
      setsuccessMsgMsg(" successfully login");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email not valid"),
    password: Yup.string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, " password not match")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: submitLogin,
  });
  return (
    <>
      <div
        className="d-flex justify-content-center align-content-center align-items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="login__wrapper shadow mb-5 bg-white">
          <div className="mb-30 text-center">
            <h3> Hello Again</h3>
            <p>Enter your credentials to access your account.</p>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="login__input-wrapper">
                {errorMsg ? (
                  <div className="alert alert-danger">{errorMsg}</div>
                ) : (
                  ""
                )}
                {successMsg ? (
                  <div className="alert alert-success">{successMsg}</div>
                ) : (
                  ""
                )}

                <div className="login__input-item">
                  <div className="login__input position-relative">
                    <input
                      id="email"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      type="email"
                      placeholder="Enter your email*"
                    />
                    <span>
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 14.6H5C2.6 14.6 1 13.4 1 10.6V5C1 2.2 2.6 1 5 1H13C15.4 1 17 2.2 17 5V10.6C17 13.4 15.4 14.6 13 14.6Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13 5.40002L10.496 7.40002C9.672 8.05602 8.32 8.05602 7.496 7.40002L5 5.40002"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </div>
                  {formik.errors.email && formik.touched.email ? (
                    <p className="alert alert-danger ">{formik.errors.email}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="login__input-item ">
                  <div className="login__input-item-inner position-relative">
                    <div className="login__input">
                      <input
                        id="password"
                        name="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        placeholder="Password"
                      />
                      <span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.20312 7.4V5.8C4.20312 3.152 5.00312 1 9.00312 1C13.0031 1 13.8031 3.152 13.8031 5.8V7.4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M9 14.2C10.1046 14.2 11 13.3045 11 12.2C11 11.0954 10.1046 10.2 9 10.2C7.89543 10.2 7 11.0954 7 12.2C7 13.3045 7.89543 14.2 9 14.2Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M13 17H5C1.8 17 1 16.2 1 13V11.4C1 8.20002 1.8 7.40002 5 7.40002H13C16.2 7.40002 17 8.20002 17 11.4V13C17 16.2 16.2 17 13 17Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  {formik.errors.password && formik.touched.password ? (
                    <p className="alert alert-danger ">
                      {formik.errors.password}
                    </p>
                  ) : (
                    ""
                  )}
                  <button
                    type="submit"
                    className="tp-btn w-100 border-0 text-center "
                  >
                    {loading ? (
                      <Hourglass
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={["#fff", "#FFF"]}
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className="login__register-now text-center mt-2">
              <p>
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "var(--tp-theme-1)" }}
                >
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sigin;
