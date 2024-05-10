import React from "react";

export default function ProductHolder({ product }) {
  return (
    <div className="col-xl-3 col-lg-4 col-sm-6">
      <div className="product-holder position-relative overflow-hidden">
        <div className="productImg position-relative overflow-hidden  ">
          <img
            className="img-fluid"
            src={"http://localhost:5000/img/products/" + product.images[0]}
            alt=""
          />
          <div className="addCart">
            <button>
              <h4>
                add to cart <i className="fa-solid fa-cart-shopping"></i>{" "}
              </h4>
            </button>
          </div>
        </div>
        <div className="productHiddenSection">
          <div className="sideSection">
            <ul className="text-white listAction">
              <button>
                <li>
                  <i className="fa-solid fa-heart"></i>
                </li>
              </button>
              <button>
                <li>
                  <i className="fa-solid fa-eye"></i>
                </li>
              </button>
              <button>
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
  );
}
