import React, { useEffect, useState } from "react";
import "../Shop/shop.css";
import { Link, useSearchParams } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import axios from "axios";
import ProductHolder from "../ReusableComp/ProductHolder/ProductHolder";
import { debounce } from "lodash";
import * as Checkbox from "@radix-ui/react-checkbox";

export default function Shop() {
  const [filterName, setFilterName] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useSearchParams();

  async function getAllProducts() {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/products`,
        {
          params: search,
        }
      );

      setDefaultProducts(data.data.data);
      setAllProducts(data.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  // ===== getAllCategories
  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/categories`
      );

      setAllCategories(data.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  // ===== getAllBrands
  async function getAllBrands() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/brands`);

      setAllBrands(data.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
    getAllCategories();
    getAllBrands();
  }, [search]);

  function sortLowtoHigh() {
    const copyProduct = [...defaultProducts];
    copyProduct.sort((a, b) => a.price - b.price);
    setAllProducts(copyProduct);
  }
  function sortHightoLow() {
    const copyProduct = [...defaultProducts];
    copyProduct.sort((a, b) => b.price - a.price);
    setAllProducts(copyProduct);
  }
  function onSale() {
    const discountedProducts = allProducts.filter((product) => {
      return product.discount > 0;
    });
    setAllProducts(discountedProducts);
  }
  function setDefaultval() {
    const copyProduct = [...defaultProducts];
    setAllProducts(copyProduct);
  }

  const onSearch = debounce((e) => {
    const searchText = e.target.value;

    if (searchText.length === 0) {
      search.delete("search");
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set("search", searchText);
      setSearch(search, {
        replace: true,
      });
    }
  }, 300);

  const brandChange = (brand) => {
    search.set("brand", brand);
    setSearch(search, {
      replace: true,
    });
  };
  return (
    <div className="shop">
      <div className="container">
        <div className="path">
          <Link to="/">
            <i className="fa-solid fa-house"></i>Home
          </Link>
          {">"} Products
        </div>
        <div className="shopHeader border-1 d-flex justify-content-between align-items-center">
          <div className="ShopHeaderTitle">
            <h4>Showing 1–4 of 4 results</h4>
          </div>
          <div className="ShopHeaderFilter">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle DropDownStyle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {filterName ? filterName : "Default Sorting"}
              </button>
              <ul className="dropdown-menu">
                <li
                  onClick={() => {
                    setFilterName("Default Sorting");
                    setDefaultval();
                  }}
                >
                  <span className="dropdown-item" href="#">
                    Default Sorting
                  </span>
                </li>
                <li
                  onClick={() => {
                    setFilterName("Low to High");
                    sortLowtoHigh();
                  }}
                >
                  <span className="dropdown-item" href="#">
                    Low to High
                  </span>
                </li>
                <li
                  onClick={() => {
                    setFilterName("High to Low");
                    sortHightoLow();
                  }}
                >
                  <span className="dropdown-item" href="#">
                    High to Low
                  </span>
                </li>
                <li
                  onClick={() => {
                    setFilterName("On Sale");
                    onSale();
                  }}
                >
                  <span className="dropdown-item" href="#">
                    On Sale
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-3">
            <div className="shopSidebar mt-5 pt-5">
              <div className="shopFilter">
                <div className="shopFilterHeader">
                  <h3 className="border-bottom pb-2">Categories</h3>
                </div>
                <div className="shopFiltercontent mt-4">
                  <ul>
                    {allCategories?.map((cat) => {
                      return (
                        <li key={cat._id}>
                          <button
                            onClick={() => {
                              search.set("category", cat._id);
                              setSearch(search, {
                                replace: true,
                              });
                            }}
                            className="btn"
                          >
                            {cat.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="shopFilter mt-5">
                <div className="shopFilterHeader">
                  <h3 className="border-bottom pb-2">Brands</h3>
                </div>
                <div className="shopFiltercontent mt-4">
                  {allBrands?.map((brand, ind) => {
                    return (
                      <div
                        key={ind}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <Checkbox.Root
                          className="CheckboxRoot"
                          id={brand.name}
                          name={brand.name}
                          value={brand.name}
                          onCheckedChange={() => {
                            brandChange(brand._id);
                          }}
                        >
                          <Checkbox.Indicator className="CheckboxIndicator">
                            <svg
                              width={25}
                              height={25}
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label className="Label" htmlFor={brand.name}>
                          {brand.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="mainShop">
              {loading ? ( // Display spinner if loading is true
                <div className="text-center">
                  <i className="fa fa-spinner fa-spin"></i> Loading...
                </div>
              ) : (
                <div className="row">
                  <input
                    className="form-control m-4 p-2"
                    placeholder="Search"
                    type="search"
                    id="search"
                    name="search"
                    onChange={onSearch}
                  />
                  {allProducts?.map((product) => (
                    <ProductHolder key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
