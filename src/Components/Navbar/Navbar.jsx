import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/logo-black.svg";

import { AuthContext } from "../../context/Auth";
import { CiHeart } from "react-icons/ci";
export default function Navbar() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/signin");
  }
  return (
    <>
      <div className=" ">
        <nav className="navbar navbar-expand-lg bg-light navbarBorder navbarPadding">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-1 col-xl-2 col-lg-4 col-md-4 col-sm-5 col-8 pe-5">
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>

            <div
              className="offcanvas offcanvas-end text-bg-light"
              tabIndex={-1}
              id="offcanvasDarkNavbar"
              aria-labelledby="offcanvasDarkNavbarLabel"
            >
              <div className="offcanvas-header">
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="logo" />
                </Link>
                <button
                  type="button"
                  className="btn-close btn-close-dark"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body me-auto align-items-center ps-5  ">
                <div className="mainMenu d-flex align-items-center">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item ">
                      <NavLink className="nav-link">Home</NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink className="nav-link" to="/#">
                        Abouts Us
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/shop">
                        shop
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/#">
                        Contact us
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xxl-5 col-xl-3 col-lg-8 col-md-8 col-sm-7 col-4">
              <div className=" d-flex justify-content-center align-items-center pl-30">
                <ul className="navbar-nav  mb-2 mb-lg-0 ">
                  {token ? (
                    <>
                      <li className="nav-item  ">
                        <span
                          onClick={logout}
                          style={{
                            cursor: "pointer",
                            color: "#000 !important",
                          }}
                          className="nav-link text-dark  "
                          to="/"
                        >
                          Log out
                        </span>
                      </li>

                      <li className="nav-item ">
                        <NavLink className="nav-link " to="/cart">
                          <i
                            style={{ fontSize: "25px" }}
                            className="fa-solid fa-cart-shopping"
                          ></i>
                        </NavLink>
                      </li>
                      <li className="nav-item ">
                        <NavLink className="nav-link " to="/wishlist">
                          <i
                            style={{ fontSize: "25px" }}
                            className="fa-regular fa-heart"
                          ></i>
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item ">
                        <NavLink className="nav-link " to="/signin">
                          login
                        </NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">
                          signup
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasDarkNavbar"
              aria-controls="offcanvasDarkNavbar"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
