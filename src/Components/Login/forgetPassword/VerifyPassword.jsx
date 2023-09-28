import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "../Login.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import {
  forgetPassword,
  resendCode,
  varifyPasswordEmail,
} from "../../../Redux/Slicies/authActions";
import { clearError } from "../../../Redux/Slicies/authSlice";
import Timer from "../../Timer/Timer";

const VerifyPassword = ({ onSubmit: moveToNext }) => {
  const [disabled, setDisabled] = useState(true);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, msgError } = useSelector((state) => state.auth);

  const resendCode = async () => {
    setClicked(true);
    await dispatch(resendCode());
  };

  async function handleVerifyPassword(values) {
    const { payload } = await dispatch(varifyPasswordEmail(values));
    if (payload.message === "success") {
      moveToNext();
    }
  }

  let validationSchema = Yup.object({
    code: Yup.string().required("Verification Code is required").min(4),
  });

  let formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema,
    onSubmit: handleVerifyPassword,
  });
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  return (
    <div className=" m-auto container text-dark mt-5">
      <h2 className={`${styles.pageHead} m-auto text-center mb-2`}>
        Verify Password
      </h2>
      <div className='text-center mt-4'>
        <p><i className={`fa-solid fa-paper-plane d-block ${styles.iconFontSize}`}></i></p>
        <b>An email has been sent to you.</b>
        <p className='text-muted'>Check the email that’s associated with your account for the verification code </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="p-2 row">
        <div className="d-flex justify-content-between align-items-center mb-2">
          {msgError ? (
            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
          ) : null}
          <TextField
            onChange={formik.handleChange}
            // error={formik.errors.code && formik.touched.code && true}
            // helperText={formik.errors.code}
            id="code"
            label="code"
            className="w-50"
            name="code"
            type="text"
            onBlur={formik.handleBlur}
            margin="dense"
          />
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
            className={`mainBtn ${styles.verifyBtn}`}
            disabled={formik.values.code.length !== 4}
          >
            Verify
          </Button>
          {console.log(formik.isValid)}
        </div>

        <div className="d-flex gap-2 text-muted justify-content-center align-items-center">
          <button className={` ${styles.resendBtn}`} onClick={resendCode} disabled={disabled}>
            Send me another code
          </button>
          <p className="mb-0">after</p>
          <Timer
            setDisabled={setDisabled}
            clicked={clicked}
            setClicked={setClicked}
          />
        </div>
      </form>
    </div>
  );
};

export default VerifyPassword;

