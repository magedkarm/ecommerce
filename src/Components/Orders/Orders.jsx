import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Orders() {
  const [getOrders, setGetOrders] = useState(null);
  const [userId, setUserId] = useState(null);

  async function getOrder() {
    try {
      const { data } = await axios.get(
        "https://e-commerce-project-1-tvev.onrender.com/api/v1/orders",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setGetOrders(data?.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(function () {
    getOrder();
  }, []);
  return (
    <div className="pagesUesrs">
      <section
        className="topSection  d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f1f1f1", padding: "100px 0px" }}
      >
        <div className="heaterPages ">
          <h2>Orders</h2>
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
                <div className="OrderTitle text-center">
                  <h3>Your Orders</h3>
                </div>
                <div className="row mt-5">
                  <div className="col-12 border border-1 px-5 py-4">
                    <table className="w-100 table">
                      <thead>
                        <tr className="mb-5">
                          <th style={{ paddingBottom: "20px" }} scope="col">
                            #
                          </th>
                          <th style={{ paddingBottom: "20px" }} scope="col">
                            Order id
                          </th>
                          <th style={{ paddingBottom: "20px" }} scope="col">
                            Order Time
                          </th>
                          <th style={{ paddingBottom: "20px" }} scope="col">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {getOrders?.map((order, ind) => {
                          return (
                            <tr key={order._id}>
                              <td style={{ border: "0" }} scope="row">
                                {ind + 1}
                              </td>
                              <td
                                style={{
                                  border: "0",
                                  color: "#f50963",
                                  fontWeight: "600",
                                }}
                              >
                                #{order._id.slice(-4)}
                              </td>
                              <td style={{ border: "0" }}>
                                {order.createdAt.slice(0, 10)}
                              </td>
                              <td
                                style={{
                                  border: "0",
                                  color: "#6364db",
                                  fontWeight: "600",
                                }}
                              >
                                {order.status}
                              </td>
                            </tr>
                          );
                        })}
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
  );
}
