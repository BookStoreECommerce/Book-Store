import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { handleClickOpen } from "../../Redux/Slicies/dialogSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Button, styled } from "@mui/material";

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: "inherit",
  "&.MuiButtonBase-root": {
    ":hover": {
      backgroundColor: "transparent",
    },
  },
}));

function NavBar({ navRef }) {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  return (
    <>
      <div className="fixed-top" ref={navRef}>
        <div className={styles.navTop}>
          <li className="nav-item me-5 position-relative">
            <Link className={`nav-link  ${styles.navLinkIcon}`} to="favorite">
              <FavoriteBorderOutlinedIcon
                sx={{ fontSize: { xs: 24, sm: 24, md: 27, lg: 24 } }}
              />
              <div className={` ${styles.number}`}>
                <span className={`${styles.num}`}>0</span>
              </div>
            </Link>
          </li>
          <li className="nav-item me-5 position-relative">
            <Link className={`nav-link ${styles.navLinkIcon}`} to="cart">
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: { xs: 24, sm: 24, md: 27, lg: 24 } }}
              />
              <div className={` ${styles.number}`}>
                <span className={` ${styles.num}`}>0</span>
              </div>
            </Link>
          </li>

          {user !== null && (<li className="nav-item">
            <Link className={`nav-link ${styles.navLinkIcon}`} to="profile">
              <PersonOutlineOutlinedIcon
                sx={{ fontSize: { xs: 24, sm: 24, md: 27, lg: 26 } }}
              />
              <span className={styles.colorUser}>{user.userName}</span>
            </Link>
          </li>)}
        </div>
        <nav
          className={
            navbar
              ? `navbar navbar-expand-lg ${styles.navBarContainer} ${styles.colorNav}`
              : `navbar navbar-expand-lg  ${styles.transparent}`
          }
        >
          <div className="container-fluid">
            <Link to="/" className={styles.logo}>
              <img src={logo} alt="" className="w-100" loading="lazy" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${styles.bgCollapse}`}
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className={`nav-item me-2 ${styles.navItem}`}>
                  <Link
                    className={`nav-link ${styles.navLink} ${styles.navLinkBorder}`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className={`nav-item me-2 ${styles.navItem}`}>
                  <Link
                    className={`nav-link ${styles.navLink} ${styles.navLinkBorder}`}
                    to="shop"
                  >
                    Shop
                  </Link>
                </li>

                <li className={`nav-item dropdown me-2 ${styles.navItem}`}>
                  <Link
                    className={`nav-link dropdown-toggle ${styles.navLink} ${styles.navLinkBorder}`}
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categories
                  </Link>

                  <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                    <li>
                      <Link className={`dropdown-item ${styles.item}`} to="#">
                        Science
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${styles.item}`} to="#">
                        children
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${styles.item}`} to="#">
                        Cooking
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${styles.item}`} to="#">
                        Science Fiction
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${styles.item}`} to="#">
                        Business
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${styles.item}`} to="#">
                        Music
                      </Link>
                    </li>
                    <li>
                      <Link className={`dropdown-item ${styles.item}`} to="#">
                        Architecture
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={`nav-item me-2 ${styles.navItem}`}>
                  <Link
                    className={`nav-link ${styles.navLink} ${styles.navLinkBorder}`}
                    to="contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              {user === null && (
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavButton
                      className={`nav-link ${styles.navLink}`}
                      onClick={() => {
                        dispatch(handleClickOpen({ name: "login" }));
                      }}
                    >
                      Login
                    </NavButton>
                  </li>
                  <li className="nav-item">
                    <NavButton
                      className={`nav-link ${styles.navLink}`}
                      onClick={() => {
                        dispatch(handleClickOpen({ name: "register" }));
                      }}
                    >
                      Register
                    </NavButton>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default memo(NavBar)
