
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import styles from './NavBar.module.css'


export default function NavBar() {
  return (
   <>
   <nav className={`navbar navbar-expand-lg py-3 ${styles.transparent}`}>
  <div className="container-fluid">
    <Link to='/' className={styles.logo}>
    <img src={logo} alt="" className='w-100 '/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item me-2">
          <Link className={`nav-link ${styles.navLink}`} to="home">Home</Link>
        </li>
        <li className="nav-item me-2">
          <Link className={`nav-link ${styles.navLink}`} to="shop">Shop</Link>
        </li>
        
        <li className="nav-item dropdown me-2">
          <Link className={`nav-link dropdown-toggle ${styles.navLink}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          {/* dropdown */}
          <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
            <li><Link className={`dropdown-item ${styles.item}`} to="#">Science</Link></li>
            <li><Link className={`dropdown-item ${styles.item}`} to="#">children</Link></li>
     
            <li><Link className={`dropdown-item ${styles.item}`} to="#">Cook</Link></li>
          </ul>
        </li>
        <li className="nav-item me-2">
          <Link className={`nav-link ${styles.navLink}`} to="contact">Contact</Link>
        </li>
   
      </ul>
 
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item me-2 px-3">
          <input type="text" placeholder='search....' className='form-control rounded-pill'/>
        </li>
        <li className="nav-item me-2">
          <Link className={`nav-link ${styles.navLink}`}to="favorite">
          <i className={`fa-sharp fa-solid fa-heart ${styles.size}`}></i>
          </Link>
        </li>
        <li className="nav-item me-2">
          <Link className={`nav-link ${styles.navLink}`} to="cart">
          <i className={`fa-solid fa-cart-shopping ${styles.size}`}></i>
          </Link>
        </li>
        <li className="nav-item me-2">
          <Link className={`nav-link ${styles.navLink}`} to="profile">
          <i className={`fa-solid fa-user me-2 ${styles.size}`}></i>
          <span>username</span>
          </Link>
        </li>
   
        <li className="nav-item">
          <Link className={`nav-link ${styles.navLink}`} to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${styles.navLink}`} to="register">Register</Link>
        </li>
   
      </ul>
    
    </div>
  </div>
</nav>
   </>
  )
}
