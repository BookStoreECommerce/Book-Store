import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from "yup";
import styles from "../Login.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField } from "@mui/material";
import { Link } from 'react-router-dom';
import { forgetPassword, varifyPasswordEmail } from '../../../Redux/Slicies/authActions';
import { clearError } from '../../../Redux/Slicies/authSlice';



const VerifyPassword = ({ onSubmit: moveToNext }) => {
    const dispatch = useDispatch();
    const { isLoading, msgError } = useSelector((state) => state.auth);

    const resendCode = async () => {
        await dispatch(resendResetPass());
    }

    async function handleVerifyPassword(values) {
        const { payload } = await dispatch(varifyPasswordEmail(values));
        if (payload.message === "success") {
            moveToNext();
        } else {
        }
        // if (resend.message === "success") {
        //     console.log("doneeeee");
        //     // moveToNext();
        // } else {
        //     console.log(resend.message);
        // }
    }

    let validationSchema = Yup.object({
        code: Yup.string().required("Verification Code is required").min(4),
    });


    let formik = useFormik({
        initialValues: {
            code: ''
        },
        validationSchema,
        onSubmit: handleVerifyPassword
    });
    useEffect(() => {
        dispatch(clearError());

    }, [dispatch]);
    return (

        <div className=' m-auto container text-dark mt-5'>
            <h2 className={`${styles.pageHead} m-auto text-center mb-2`}>
                Verify Password
            </h2>
            <form onSubmit={formik.handleSubmit} className='p-5 pt-2 row'>

                <div className="form-group mb-3">
                    {msgError ? (
                        <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
                    ) : null}
                    <TextField
                        onChange={formik.handleChange}
                        error={formik.errors.code && formik.touched.code && true}
                        helperText={formik.errors.code}
                        id="code"
                        label="code"
                        className="w-100"
                        name="code"
                        type="text"
                        onBlur={formik.handleBlur}
                        margin="dense"
                    />
                </div>
                <div className="form-group mb-3 d-flex justify-content-between align-items-end">
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
                        className={`mainBtn ${styles.fitContent} text-start`}
                        disabled={formik.isValid ? false : true}
                    >
                        Verify
                    </Button>

                    <div className="d-flex gap-1 text-muted justify-content-end">
                        <Link className="text-muted" onClick={resendCode}>Send me another code</Link>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default VerifyPassword
