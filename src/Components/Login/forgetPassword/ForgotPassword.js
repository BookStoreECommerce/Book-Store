import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";
import styles from "../Login.module.css";
import { forgetPassword } from "../../../Redux/Slicies/authSlice";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = ({ onSubmit: moveToNext }) => {
  const [messageError, setMessageError] = useState("");

  const { error: errorMsg } = useSelector((state) => state.auth);

  console.log(errorMsg);

  const dispatch = useDispatch();

  const handleForgotPassword = async (values) => {
    const { payload } = await dispatch(forgetPassword(values));
    if (payload.data.message === "success") {
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

  return (
    <div className="w-50 m-auto container text-dark mt-5">
      <h2 className={`${styles.pageHead} m-auto text-center mb-2`}>
        Forgot Password
      </h2>
      {errorMsg && <p>{errorMsg}</p>}
      <p>
        Please enter your email address and we will send you instructions on how
        to reset your password
      </p>
      {messageError.length > 0 ? (
        <span className="alert alert-danger">{messageError}</span>
      ) : null}
      <form onSubmit={formik.handleSubmit} className="p-5 pt-2 row">
        <div className="form-group mb-3">
          <label htmlFor="email" className="mb-2">
            Email
          </label>

          <input
            type="text"
            className={` ${styles.bgBtn} form-control mb-1`}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          {formik.errors.email && formik.touched.email ? (
            <small className="form-text text-danger text-center">
              {formik.errors.email}
            </small>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
