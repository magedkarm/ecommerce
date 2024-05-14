import React from "react";
import banner from "../../Assets/Images/cat/banner-1.jpg";
import "../Banner/Banner.css";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <div
          className="bannerAria imgbg"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8 ">
              <div className="bannerContent">
                <span>Apple iPhone 12 Pro</span>
                <h3>
                  <Link>The wait is on: iphon 12 max pro</Link>
                </h3>
              </div>
              <p>
                Last call for up to <span>32%</span> off!
              </p>
              <button>
                Buy now{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 7H13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M7 1L13 7L7 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
