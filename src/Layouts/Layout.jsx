import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/MainLayoutComponents/Navbar/NavBar";
import Footer from "../Components/MainLayoutComponents/Footer/Footer";
import CustomizedDialogs from "../Components/Dialogs/AuthDialog/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { setHeight } from "../Redux/Slicies/appSlice";
import PolicyDialog from "../Components/Dialogs/PolicyDialog/PolicyDialog";
import { createCart, getCart } from "../Redux/Slicies/cartAction.js";
import { getCartWithoutToken } from "../Redux/Slicies/cartSlice.js";

export default function Layout() {
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const dispatch = useDispatch();
  // const token = localStorage.getItem("access-token");
  const { token } = useSelector(({ auth }) => auth);
  useEffect(() => {
    dispatch(
      setHeight({
        footerH: footerRef.current.clientHeight,
        navH: navRef.current.clientHeight,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    if (token && localStorage.getItem("cartDetails")) {
      let cartDetails = localStorage.getItem("cartDetails");
      cartDetails = JSON.parse(cartDetails);
      dispatch(createCart(cartDetails));
    } else if (token && !localStorage.getItem("cartDetails")) {
      dispatch(getCart());
    } else {
      dispatch(getCartWithoutToken());
    }
  }, [token]);
  return (
    <>
      <NavBar navRef={navRef} />
      <Outlet></Outlet>
      <CustomizedDialogs />
      <PolicyDialog />
      <Footer footerRef={footerRef} />
    </>
  );
}
