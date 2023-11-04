import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { handleClickOpen } from "../../../Redux/Slicies/dialogSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { logout } from "../../../Redux/Slicies/authSlice";
import {signout } from "../../../Redux/Slicies/authActions";
import { getCatBooks } from '../../../Redux/Slicies/CategoriesBookActions';
import { getCart } from "../../../Redux/Slicies/cartAction";


function NavBar({ navRef }) {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // const { user, token } = useSelector((state) => state.auth);
  const token = localStorage.getItem("access-token");
  const { books, localStorageCart } = useSelector((state) => state.cart);

  let arr = JSON.parse(localStorage.getItem('whishList'))


  const changeBackground = () => {
    if (window.scrollY >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

    // Read Cart Number
    let cartNumber;
    if (token) {
      cartNumber = books.length;
    }
    else if (!token && localStorage.getItem('cartDetails')) {
      cartNumber = JSON.parse(localStorage.getItem('cartDetails')).length;
  
    }
    else if (!token && !localStorage.getItem('cartDetails')) {
      cartNumber = 0;
    }

  useEffect(() => {

    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  let { categoriesBooks } = useSelector((state) => state.book)
  let category = { categoriesBooks }.categoriesBooks.result

  useEffect(() => {
    dispatch(getCart());
  }, [token])

  useEffect(() => {
    dispatch(getCatBooks())
  }, [])

  const handleLogout = () => {
    dispatch(logout());
    dispatch(signout());
    navigate('/');
  }
  const linkStyle = `nav-link ${styles.navLink} ${styles.navLinkBorder} `;
  const dropStyle = `nav-link dropdown-toggle ${styles.navLink} ${styles.navLinkBorder} `;
  return (
    <>
      <div data-testid="NavBar" className="fixed-top" ref={navRef}>
        <div className={styles.navTop}>
          <li className="nav-item me-5 position-relative">
          {user !== null && token !== null ? <>
            <Link className={`nav-link  ${styles.navLinkIcon}`} to="wishlist">
              <FavoriteBorderOutlinedIcon
                sx={{ fontSize: { xs: 24, sm: 24, md: 27, lg: 24 } }}
              />
              <div className={` ${styles.number}`}>
                <span className={`${styles.num}`}>{arr?.length === undefined || arr?.length === null ? 0 : arr.length}</span>
              </div>
            </Link>
          </>:
                <Link className={`nav-link  ${styles.navLinkIcon}`} onClick={() => {
                  dispatch(handleClickOpen({ name: "login" }));
                }}>
                <FavoriteBorderOutlinedIcon
                  sx={{ fontSize: { xs: 24, sm: 24, md: 27, lg: 24 } }}
                />
                <div className={` ${styles.number}`}>
                  <span className={`${styles.num}`}>{arr?.length === undefined || arr?.length === null ? 0 : arr.length}</span>
                </div>
              </Link>
          }
          </li>
          <li readOnly className="nav-item me-5 position-relative">
            <Link className={`nav-link ${styles.navLinkIcon}`} to="cart">
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: { xs: 24, sm: 24, md: 27, lg: 24 } }}
              />
              <div className={` ${styles.number}`}>
                <span className={` ${styles.num}`}>{cartNumber}</span>
              </div>
            </Link>
          </li>
          {user !== null && token !== null && (
            <>
              <li className="nav-item">
                <Link className={`nav-link ${styles.navLinkIcon}`} to="userInfo">
                  <PersonOutlineOutlinedIcon
                    sx={{ fontSize: { xs: 24, sm: 24, md: 27, lg: 26 } }}
                  />
                  <span className={styles.colorUser}>{user.userName}</span>
                </Link>
              </li>

            </>
          )}
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
                  <NavLink

                    className={({ isActive }) => isActive ? linkStyle + styles.itemActive : linkStyle}
                    to="/"
                    end
                  >
                    Home
                  </NavLink>
                </li>


                <li className={`nav-item dropdown me-2 ${styles.navItem}`}>
                  <NavLink
                    className={({ isActive }) => isActive ? dropStyle + styles.itemActive : dropStyle}
                    to="categories"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    end
                  >
                    categories
                  </NavLink>

                  <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                    {category?.slice(0,8)?.map((cat,index)=>
                          <li key={index}>
                          <NavLink className={({ isActive }) => isActive ? linkStyle + styles.dropItemActive + ` dropdown-item ${styles.item}` : linkStyle + ` dropdown-item ${styles.item}`} to={`categories/${cat.slug}`}>
                            {cat.name}
                          </NavLink>
                        </li>
                    )}
                    <li>
                      <NavLink className={({ isActive }) => isActive ? linkStyle + styles.dropItemActivetran + ` dropdown-item text-center ${styles.itemColor}` : linkStyle + ` dropdown-item text-center ${styles.itemColor}`} to="categories">
                        see more
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className={`nav-item me-2 ${styles.navItem}`}>
                  <NavLink
                    className={({ isActive }) => isActive ? linkStyle + styles.itemActive : linkStyle}
                    to="book"
                  >
                    Books
                  </NavLink>
                </li>

                <li className={`nav-item me-2 ${styles.navItem}`}>
                  <NavLink
                    className={({ isActive }) => isActive ? linkStyle + styles.itemActive : linkStyle}
                    to="contact"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>

              {user !== null && token !== null ?
                <>
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                    <li className={`nav-item me-2 ${styles.navItem}`}>
                      <Link
                        className={`nav-link ${styles.navLink}`}
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </>

                : <>
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                    <li className="nav-item">
                      <Link
                        to=""
                        className={`nav-link ${styles.navLink}`}
                        onClick={() => {
                          dispatch(handleClickOpen({ name: "login" }));
                        }}
                      >
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to=""
                        className={`nav-link ${styles.navLink}`}
                        onClick={() => {
                          dispatch(handleClickOpen({ name: "register" }));
                        }}
                      >
                        Register
                      </Link>
                    </li>
                  </ul>
                </>
                }
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default NavBar;