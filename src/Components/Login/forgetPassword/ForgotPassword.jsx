import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";
import styles from "../Login.module.css";
import { clearError, forgetPassword } from "../../../Redux/Slicies/authSlice";
import { Button, TextField } from "@mui/material";
import { useEffect } from "react";

const ForgotPassword = ({ onSubmit: moveToNext }) => {
  const { isLoading, msgError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleForgotPassword = async (values) => {
    const { payload } = await dispatch(forgetPassword(values));
    console.log(values);
    console.log(payload.message);
    if (payload.message === "success") {
      moveToNext();
    }
  };

  let validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("email is invalid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgotPassword,
  });
  useEffect(()=> {
  dispatch(clearError());  

  }, [dispatch]);
  return (
    <div className=" m-auto container text-dark mt-5">

      <h2 className={`${styles.pageHead} m-auto text-center mb-2`}>
        Forgot Password
      </h2>
      <p>
        Please enter your email address and we will send you instructions on how to reset your password
      </p>
      <form onSubmit={formik.handleSubmit} className="pt-2 row">
        <div className="form-group mb-3">
          {msgError ? (
            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
          ) : null}
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
          <Button
            variant="outlined"
            type="submit"
            endIcon={
              isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fa-solid"></i>
              )
            }
            className={`mainBtn ${styles.fitContent}`}
            disabled={formik.isValid ? false : true}
          >
            Set New Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;