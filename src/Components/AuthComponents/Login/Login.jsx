import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.css";
import { Button, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import SocialMediaBtns from "../../ReusableComponents/SocialMediaBtns/SocialMediaBtns";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { clearError, signin } from "../../../Redux/Slicies/authSlice";
import { handleClickOpen, handleClose } from "../../../Redux/Slicies/dialogSlice";

const Login = () => {
  const dispatch = useDispatch();
  // dispatch(clearError());
  // const { loginShow } = useSelector(({ dialog }) => dialog);
  const { isLoading, msgError } = useSelector((state) => {
    return state.auth;
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (values) => {
    await dispatch(signin(values));
    if (localStorage.getItem("access-token")) {
      dispatch(handleClose());
    }
  };

  const handleSignUp = () => {
    dispatch(handleClickOpen({ name: "register" }))
  }

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
    isInitialValid: false,
  });


  useEffect(()=> {
  dispatch(clearError());  

  }, [dispatch]);
  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        {msgError ? (
          <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
        ) : null}
        {/* <div className="form-group mb-3"> */}
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
        {/* </div> */}

        <FormControl variant="outlined" fullWidth margin="dense" error={formik.errors.password && formik.touched.password && true}>
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <OutlinedInput
            onChange={formik.handleChange}
            id="password-input"
            label="password"
            className="w-100"
            name="password"
            type={showPassword ? "text" : "password"}
            onBlur={formik.handleBlur}
            endAdornment={
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            }
          />
          <FormHelperText>{formik.errors.password}</FormHelperText>
        </FormControl>
        <p className=" text-end m-auto text-dark mb-3">
          <Link
            onClick={() => dispatch(handleClose())}
            to="auth/forgotPassword"
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
      <div className="d-flex gap-1 text-muted justify-content-center align-items-center">
        <div>Don't have an account?</div>
        <Button variant="text"
          onClick={handleSignUp}
          className="text-muted"
          sx={{
            textDecoration: "underline",
            textTransform: "initial",
            "&.MuiButtonBase-root": {
              ":hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              }
            }
          }}
        >
          Signup
        </Button>
      </div>

      <div className="d-flex align-items-baseline justify-content-between">
        <div className={styles.leftLine}></div>
        <span className={styles.or}>or</span>
        <div className={styles.rightLine}></div>
      </div>



      <SocialMediaBtns />
    </>
  );
};

export default Login;
