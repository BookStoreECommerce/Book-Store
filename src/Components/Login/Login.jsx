import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signin, resetError } from "../../Redux/Slicies/authSlice";
import styles from "./Login.module.css";
import { Button, TextField } from "@mui/material";
import CustomizedDialogs from "../Dialog/Dialog";
import { Link, useNavigate } from "react-router-dom";
import { handleClose } from "../../Redux/Slicies/dialogSlice";
import SocialMediaBtns from "../ReusableComponents/SocialMediaBtns/SocialMediaBtns";

const Login = () => {
  const [messageError, setMessageError] = useState("");

  const dispatch = useDispatch();
  const { loginShow } = useSelector(({ dialog }) => dialog);
  const { isLoading, error } = useSelector((state) => {
    return state.auth;
  });

  const handleLogin = async (values) => {
    await dispatch(signin(values));
    if (localStorage.getItem("BookStoreToken")) {
      dispatch(handleClose());
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
    password: Yup.string().required("password is required").min(9),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <CustomizedDialogs show={loginShow}>
      <div className="m-auto container text-dark mt-5">
        <h4 className="mainTitle text-center">Login</h4>
        {messageError.length > 0 ? (
          <span className="alert alert-danger">{messageError}</span>
        ) : null}
        <form onSubmit={formik.handleSubmit} className="p-5 row">
          {error ? (
            <div className="ps-2 alert alert-danger mb-4">{error}</div>
          ) : null}
          <div className="form-group mb-3">
            <TextField
              onChange={formik.handleChange}
              error={formik.errors.email && formik.touched.email && true}
              helperText={formik.errors.email}
              id="email"
              label="Email"
              className="w-100"
              name="email"
              type="text"
              onBlur={formik.handleBlur}
              margin="dense"
            />
          </div>

          <div className="form-group mb-3">
            <TextField
              onChange={formik.handleChange}
              error={formik.errors.password && formik.touched.password && true}
              helperText={formik.errors.password}
              id="password"
              label="Password"
              className="w-100"
              name="password"
              type="password"
              onBlur={formik.handleBlur}
              margin="dense"
            />
          </div>
          <p className=" text-end m-auto text-dark mb-3">
            <Link
              onClick={() => dispatch(handleClose())}
              to="/forgotPassword"
              className={`${styles.forgotPpassword}`}
            >
              Forgot password ?
            </Link>
          </p>
          <Button
            variant="outlined"
            type="submit"
            endIcon={
              isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid fa-sign-in"></i>
              )
            }
            className={`mainBtn`}
            disabled={formik.isValid ? false : true}
          >
            Login
          </Button>
        </form>
        <div className="d-flex gap-1 text-muted justify-content-center">
          <div>Don't have an account?</div>
          <a className="text-muted" href="\">
            Signup
          </a>
        </div>

        <div className="d-flex align-items-baseline justify-content-between">
          <div className={styles.leftLine}></div>
          <span className={styles.or}>or</span>
          <div className={styles.rightLine}></div>
        </div>

        <SocialMediaBtns />
      </div>
    </CustomizedDialogs>
  );
};

export default Login;
