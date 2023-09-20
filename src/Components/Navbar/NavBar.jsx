import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import { handleClickOpen } from "../../Redux/Slicies/dialogSlice";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const dispatch = useDispatch()
  const changeBackground = () => {

    if (window.scrollY >= 100) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }
  useEffect(() => {
    changeBackground()
    window.addEventListener("scroll", changeBackground)
  })
  return (
    <>
      <div className="fixed-top">
            <div className={styles.navTop}>
              <li className="nav-item me-5 position-relative">
                <Link className={`nav-link  ${styles.navLinkIcon}`} to="favorite">
                  <FavoriteBorderOutlinedIcon  sx={{fontSize: {xs:24, sm:24, md:27, lg:24}}}/>
                  <div className={` ${styles.number}`}>
                    <span className={`${styles.num}`}>0</span>
                    </div>
                </Link>
              </li>
              <li className="nav-item me-5 position-relative">
                <Link className={`nav-link ${styles.navLinkIcon}`} to="cart">
      
                  <ShoppingCartOutlinedIcon sx={{fontSize: {xs:24, sm:24, md:27, lg:24}}} />
                  <div className={` ${styles.number}`}><span className={` ${styles.num}`}>0</span></div>
                </Link>
              </li>

              <li className="nav-item ms-3">
                  <Link className={`nav-link ${styles.navLinkIcon}`} to="profile">
                    <PersonOutlineOutlinedIcon sx={{fontSize: {xs:24, sm:24, md:27, lg:26}}} />
                    <span className={styles.colorUser}>username</span>
                  </Link>
                </li>
            </div>
        <nav className={navbar ? `navbar navbar-expand-lg ${styles.navBarContainer} ${styles.colorNav}` : `navbar navbar-expand-lg  ${styles.transparent}`}>
          <div className="container-fluid">
            <Link to='/' className={styles.logo}>
              <img src={logo} alt="" className='w-100' />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${styles.bgCollapse}`} id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className={`nav-item me-2 ${styles.navItem}`}>
                  <Link className={`nav-link ${styles.navLink} ${styles.navLinkBorder}`} to="home">Home</Link>
                </li>
                <li className={`nav-item me-2 ${styles.navItem}`}>
                  <Link className={`nav-link ${styles.navLink} ${styles.navLinkBorder}`} to="shop">Shop</Link>
                </li>

                <li className={`nav-item dropdown me-2 ${styles.navItem}`}>
                  <Link className={`nav-link dropdown-toggle ${styles.navLink} ${styles.navLinkBorder}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                  </Link>

                  <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                    <li><Link className={`dropdown-item ${styles.item}`} to="#">Science</Link></li>
                    <li><Link className={`dropdown-item ${styles.item}`} to="#">children</Link></li>
                    <li><Link className={`dropdown-item ${styles.item}`} to="#">Cooking</Link></li>
                    <li><Link className={`dropdown-item ${styles.item}`} to="#">Science Fiction</Link></li>
                    <li><Link className={`dropdown-item ${styles.item}`} to="#">Business</Link></li>
                    <li><Link className={`dropdown-item ${styles.item}`} to="#">Music</Link></li>
                    <li><Link className={`dropdown-item ${styles.item}`} to="#">Architecture</Link></li>
                  </ul>
                </li>
                <li className={`nav-item me-2 ${styles.navItem}`}>
                  <Link className={`nav-link ${styles.navLink} ${styles.navLinkBorder}`} to="contact">Contact</Link>
                </li>
              </ul>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">


            

                <li className="nav-item">
                  <Link
                    className={`nav-link ${styles.navLink}`} onClick={() => { dispatch(handleClickOpen({ name: "login" })) }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${styles.navLink}`} onClick={() => { dispatch(handleClickOpen({ name: "register" })) }}>
                    Register
                  </button>
                </li>
              </ul>
            </div>
      
          </div>
        </nav>
      </div>
    </>
  )
}
