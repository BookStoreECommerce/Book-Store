import logo from "./Book1.png";

import React from "react";
import styles from "./BookProfile.module.css"
export default function BookProfile() {
  return (
    <div className={styles.book_profile}>
      <div className="container py-5 mt-5">
        <div className="row">
          {/* <div className="col-md-1">
            <img src={logo} alt="" className="w-100 mb-3" />
            <img src={logo} alt="" className="w-100 mb-3" />
            <img src={logo} alt="" className="w-100 mb-3" />
            <img src={logo} alt="" className="w-100 mb-3" />
          </div> */}
          <div className="col-md-4 position-relative">
            <h5 className=" position-absolute end-0 opacity-50"><span class="badge bg-secondary py-3 text-light">Discount<br/> 55$</span></h5>
            <img src={logo} alt="" className="w-100" />
          </div>
          <div className="col-md-7">
            <h2>Book Name: </h2>
            <h2>Author: </h2>
            <h3>Category:</h3>
            <h3>Price: 55$</h3>
            <h3>About Book:</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                temporibus maxime dolores impedit omnis vel harum fugiat maiores
                debitis molestias?
              </p>
              <p>
                <span className="badge bg-secondary px-3 py-2 me-2 text-light">Price: 55$</span>
                <span className="badge bg-secondary px-3 py-2 mx-2 text-light">Publisher: Glendon Association; 0 edition</span>
                <span className="badge bg-secondary px-3 py-2 mx-2 text-light">Published At: 1987</span>
                <span className="badge bg-secondary px-3 py-2 mx-2 text-light">pages: 405</span>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}
