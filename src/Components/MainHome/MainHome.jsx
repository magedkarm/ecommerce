import React from "react";
import style from "../MainHome/MainHome.module.css";
import { Link } from "react-router-dom";
export default function MainHome() {
  return (
    <main className={style.main + ` d-flex align-items-end overflow-hidden `}>
      <div className="container   ">
        <div className="row align-self-end">
          <div className="col-xl-6 col-lg-6">
            <div className="mainConten z-3 position-relative">
              <span className={style.mainTitle}>
                Best Ear
                <br />
                Headphones
              </span>
              <h3 className={style.mainTitle2}>
                Find Best
                <br />
                Matley Sound.
              </h3>
              <div className={style.shopBtn}>
                <Link className={"nav-link"} to="/shop">
                  {" "}
                  Shop Now{" "}
                  <i
                    className={style.stopBtn_i + " fa-solid fa-arrow-right"}
                  ></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div
              className={
                style.mr40 + " mainContent position-relative text-end z-1 "
              }
            >
              <span className={style.circleMain}></span>
              <span
                className={style.circleMain + " " + style.circleMain1}
              ></span>
              <img
                className={style.MainImg + " z-3 position-relative"}
                src={require("../../Assets/Images/girl.png")}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
