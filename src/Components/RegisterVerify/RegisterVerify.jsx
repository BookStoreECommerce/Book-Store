import React from 'react';
import styles from './RegisterVerify.module.css'
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export const RegisterVerify = () => {
  return <>
    <div className="p-2">
        <h4 className="mainTitle text-center">ACCOUNT VERIFICATION</h4>
        <div className={`text-muted w-100 m-auto mb-2 ${styles.line}`}></div>
        <div className='text-center'>
            <i class={`fa-solid fa-paper-plane d-block ${styles.iconFontSize}`}></i>
            <b>An email has been sent to you.</b>
            <p className='text-muted'>Check the email that’s associated with your account for the verification code </p>
        </div>


        <div className='d-flex justify-content-between align-items-center'>
          {/* {error ? (
            <div className="ps-2 alert alert-danger mb-4">{error}</div>
          ) : null} */}

          <TextField
            id="outlined-error"
            label="Verification code"
            className="w-50"
            name="verification"
            type="text"
            margin="dense"
          />
            <Button
              variant="outlined"
              type="submit"
              className={`mainBtn ${styles.verifyBtn}`}
            //   disabled={formik.isValid ? false : true}
              // handel when success
            //   onClick={()=>dispatch(setDialogContent('RegisterVerify'))}
            >
              Verify
            </Button>
 
        </div>
        <div className="d-flex gap-1 text-muted justify-content-center">
          <a className="text-muted" href="\">Send me another code</a>
        </div>
    </div>
  </>
}
