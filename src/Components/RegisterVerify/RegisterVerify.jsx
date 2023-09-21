import React, { useState } from 'react';
import styles from './RegisterVerify.module.css'
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerVerification, resendVerifyCode } from "../../Redux/Slicies/authSlice";
import { handleClickOpen } from '../../Redux/Slicies/dialogSlice';

export const RegisterVerify = () => {
  const dispatch = useDispatch();
  const { isLoading, msgError } = useSelector((state) => state.auth);
  const [code, setcode] = useState(null);
  const handleChange = event => {
    setcode(event.target.value);
  };
  const handleRegVerify = async () => {
    const { payload } = await dispatch(registerVerification(code));
    if (payload.message === "success") {
      dispatch(handleClickOpen({ name: "login" }))
    }
  }
  return (
    <>
      {msgError ? (
        <div className="ps-2 alert alert-danger mb-4 ">{msgError}</div>
      ) : null}
      <div className='text-center'>
        <i className={`fa-solid fa-paper-plane d-block ${styles.iconFontSize}`}></i>
        <b>An email has been sent to you.</b>
        <p className='text-muted'>Check the email that’s associated with your account for the verification code </p>
      </div>


      <div className='d-flex justify-content-between align-items-center'>

        <TextField
          id="outlined-error"
          label="Verification code"
          className="w-50"
          name="verification"
          type="text"
          margin="dense"
          onChange={handleChange}
        />
        <Button
          variant="outlined"
          type="submit"
          className={`mainBtn ${styles.verifyBtn}`}
          disabled={code ? false : true}
          onClick={handleRegVerify}
          endIcon={
            isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              ''
            )
          }
        >
          Verify
        </Button>

      </div>
      <div className="d-flex gap-1 text-muted justify-content-center">
        <button type='button' className={`text-muted ${styles.resendBtn}`} onClick={()=>dispatch(resendVerifyCode())}>Send me another code</button>
      </div>
    </>
  )
}
