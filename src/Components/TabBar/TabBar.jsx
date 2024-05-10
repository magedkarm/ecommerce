import React from "react";
import "../TabBar/TabBar.css";
import axios from "axios";
import { useQuery } from "react-query";

import ProductHolder from "../ReusableComp/ProductHolder/ProductHolder";

export default function TabBar() {
  function getTopRated() {
    return axios.get(
      "http://localhost:5000/api/v1/products?limit=9&sort=name&price[gte]=1000&price[lte]=1500"
    );
  }
  const { data: TopRated } = useQuery("topRated", getTopRated);

  function bestSelling() {
    return axios.get("http://localhost:5000/api/v1/products?limit=9&sort=name");
  }
  const { data: BestSelling } = useQuery("bestSelling", bestSelling);

  return (
    <div className="container align-items-center">
      <div className="row">
        <div className="col-md-6">
          <div className="TitleTabbar">
            <h1 className="titleTabBar">Popular Products</h1>
          </div>
        </div>
        <div className="col-md-6">
          <div className="UlTabBar">
            <ul
              className="nav nav-pills mb-3 justify-content-end"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-Top-Rated-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Top-Rated"
                  type="button"
                  role="tab"
                  aria-controls="pills-Top-Rated"
                  aria-selected="true"
                >
                  Top Rated
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-Best-Selling-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Best-Selling"
                  type="button"
                  role="tab"
                  aria-controls="pills-Best-Selling"
                  aria-selected="false"
                >
                  Best Selling
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-Latest-Product-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Latest-Product"
                  type="button"
                  role="tab"
                  aria-controls="pills-Latest-Product"
                  aria-selected="false"
                >
                  Latest Product
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="tab-content my-5" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-Top-Rated"
            role="tabpanel"
            aria-labelledby="pills-Top-Rated-tab"
            tabIndex="0"
          >
            <div className="row gx-5">
              {TopRated?.data.data.data.map((product) => {
                return <ProductHolder key={product._id} product={product} />;
              })}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-Best-Selling"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            <div className="row gx-5">
              {BestSelling?.data.data.data.map((product) => {
                return <ProductHolder key={product._id} product={product} />;
              })}
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-Latest-Product"
            role="tabpanel"
            aria-labelledby="pills-Latest-Product-tab"
            tabIndex="0"
          >
            Latest Product
          </div>
        </div>
      </div>
    </div>
  );
}
