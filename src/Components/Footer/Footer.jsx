import React from "react";
import style from "../Footer/Footer.module.css";
import logo from "../../Assets/Images/logo-black (1).svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer>
        <div
          className={style.subscribe}
          style={{
            backgroundImage: `url("${require("../../Assets/Images/cta-bg-1.jpg")}")`,
          }}
        >
          <div className={"container bg-white p-5 "}>
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h3 className={style.subscribeTitle}>
                  Subscribe for
                  <br />
                  Latest Trends & Offers
                </h3>
              </div>
              <div className="col-lg-6">
                <div className={style.subscribeInput}>
                  <form action="">
                    <div className="input position-relative">
                      <input
                        placeholder="Enter Your Email..."
                        className={style.subscribeInputBox}
                        type="email"
                      />
                      <button className={style.subscribeInputBtn} type="submit">
                        Subscribe
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="topFooter container">
          <div className="row mt-5">
            <div className="col-lg-3 col-md-5 col-sm-6 pb-5">
              <div className={style.footerPr}>
                <Link href="/">
                  <img src={logo} alt="" />
                </Link>
                <p className={style.pFooter}>
                  The home and elements needed to create beautiful products.
                </p>
                <div className={style.footerSocial}>
                  <Link href="#">
                    <i class="fa-brands fa-facebook-f"></i>
                  </Link>
                  <Link href="#">
                    <i class="fa-brands fa-twitter"></i>
                  </Link>
                  <Link href="#">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </Link>
                  <Link href="#">
                    <i class="fa-brands fa-youtube"></i>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
              <div className={style.footerTitle}>
                <h3>Company</h3>
              </div>
              <div className={style.FooterUl}>
                <ul>
                  <li>
                    <Link>About us</Link>
                  </li>
                  <li>
                    <Link>Careers</Link>
                  </li>
                  <li>
                    <Link>Store Locations</Link>
                  </li>
                  <li>
                    <Link>Our Blog</Link>
                  </li>
                  <li>
                    <Link>Reviews</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className=" col-md-3 col-sm-6">
              <div className={style.footerPl}>
                <div className={style.footerTitle}>
                  <h3>Shop</h3>
                </div>
                <div className={style.FooterUl}>
                  <ul>
                    <li>
                      <Link>Game & Video</Link>
                    </li>
                    <li>
                      <Link>Phone &Tablets</Link>
                    </li>
                    <li>
                      <Link>Computers & Laptop</Link>
                    </li>
                    <li>
                      <Link>Sport Watches</Link>
                    </li>
                    <li>
                      <Link>Discounts</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-1 col-lg-3 col-md-3 col-sm-6">
              <div className={style.footerTitle}>
                <h3>Support</h3>
              </div>
              <div className={style.FooterUl}>
                <ul>
                  <li>
                    <Link>FAQs</Link>
                  </li>
                  <li>
                    <Link>Reviews</Link>
                  </li>
                  <li>
                    <Link>Contact Us</Link>
                  </li>
                  <li>
                    <Link>Shipping</Link>
                  </li>
                  <li>
                    <Link>Returns</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-5 col-sm-6">
              <div className={style.footerPl}>
                <div className={style.footerTitle}>
                  <h3>Talk To Us</h3>
                </div>
                <div className={style.FooterUl}>
                  <p className={style.pFooter}>
                    Find a location nearest you. See{" "}
                    <Link
                      style={{
                        color: "#f10c51a4",
                        fontSize: "20px",
                      }}
                    >
                      Our Stores.
                    </Link>
                  </p>
                  <Link
                    style={{
                      color: "#000",
                      fontSize: "20px",
                      fontWeight: "bolder",
                    }}
                  >
                    +624 423 26 72
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
