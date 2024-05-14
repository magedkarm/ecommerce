import React from "react";
import { Link } from "react-router-dom";

export default function Checkout() {
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
              <div className="col-md-6"></div>
              <div className="col-md-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
