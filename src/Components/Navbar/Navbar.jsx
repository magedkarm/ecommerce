import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../Assets/Images/logo-black.svg";
export default function Navbar() {
  return (
    <>
      <div className=" ">
        <nav className="navbar navbar-expand-lg bg-light fixed-top navbarBorder navbarPadding">
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
                <div className="mainMenu">
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
              <div className=" d-flex justify-content-end align-items-center pl-30"></div>
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
