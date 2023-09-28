import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button, FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput } from "@mui/material";
import styles from "./Register.module.css";
import SocialMediaBtns from "../ReusableComponents/SocialMediaBtns/SocialMediaBtns";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/Slicies/authActions";
import { handleClickOpen } from "../../Redux/Slicies/dialogSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { clearError } from "../../Redux/Slicies/authSlice";


const getCharacterValidationError = (str) => {
  return `Password must have at least 1 ${str} character`;
};

export const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, msgError } = useSelector((state) => state.auth);
  // const { registerShow } = useSelector(({ dialog }) => dialog);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=> {
    dispatch(clearError());  
  }, [dispatch]);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = () => {
    dispatch(handleClickOpen({name: "login"}))
  }

  const handleSubmit = async (values) => {
    delete values.privacyCheck;
    const { payload } = await dispatch(register(values));
    if (payload.message === "success") {
      dispatch(handleClickOpen({ name: "register-verify" }))
    }
  };

  let validationSchema = Yup.object({
    userName: Yup.string()
      .required("Name is required")
      .matches(
        /^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/,
        "Name must start with 3:8 letters (a-z)"
      ),
    email: Yup.string()
      .required("Email is required")
      .email("Please Enter a valid email"),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password should be of minimum 8 characters length')
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[!@#$%^&*()\-_=+{};:,<.>]/, getCharacterValidationError("special caracters")),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password is not matched"),
    privacyCheck: Yup.boolean().oneOf([true], "Please accept privacy policy"),
  });

  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      privacyCheck: false,
    },
    validationSchema,
    isInitialValid: false,
    onSubmit: handleSubmit,
  });


  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        {msgError ? (
          <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
        ) : null}

        <TextField
          onChange={formik.handleChange}
          error={formik.errors.userName && formik.touched.userName && true}
          helperText={formik.errors.userName}
          id="name-input"
          label="Name"
          className="w-100"
          name="userName"
          type="text"
          onBlur={formik.handleBlur}
          margin="dense"
        />
        <TextField
          onChange={formik.handleChange}
          error={formik.errors.email && formik.touched.email && true}
          helperText={formik.errors.email}
          id="email-input"
          label="email"
          className="w-100"
          name="email"
          type="text"
          onBlur={formik.handleBlur}
          margin="dense"
        />
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

        <TextField
          onChange={formik.handleChange}
          error={
            formik.errors.rePassword && formik.touched.rePassword && true
          }
          helperText={formik.errors.rePassword}
          id="repassword-input"
          label="Confirm Password"
          className="w-100"
          name="rePassword"
          type="password"
          onBlur={formik.handleBlur}
          margin="dense"
        />

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="form-check">
            <input
              className="form-check-input mainCheckbox"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="checkbox"
              value={formik.values.privacyCheck}
              id="privacyCheck"
              name="privacyCheck"
            />
            <label
              className="form-check-label text-muted"
              htmlFor="privacyCheck"
            >
              I agree to the{" "}
              <a className="text-muted" href="\">
                privacy policy
              </a>
              .
            </label>
            {formik.errors.privacyCheck && formik.touched.privacyCheck ? (
              <p className="mt-1 text-danger mb-0">
                {formik.errors.privacyCheck}
              </p>
            ) : null}
          </div>

          <Button
            variant="outlined"
            type="submit"
            endIcon={
              isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid fa-arrow-right"></i>
              )
            }
            className={`mainBtn`}
            disabled={formik.isValid ? false : true}
          >
            Next
          </Button>
        </div>
      </form>

      <div className="d-flex gap-1 text-muted justify-content-center align-items-center">
        <div>Already have an account?</div>
        <Button variant="text"
          onClick={handleSignIn}
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
          Login
        </Button>
        {/* <a className="text-muted" href="\">
          Login
        </a> */}
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
