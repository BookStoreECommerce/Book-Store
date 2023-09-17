import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup";
import styles from "../Login.module.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from "react-redux";
import { varifyPasswordEmail } from '../../../Redux/Slicies/authSlice';
import { Button, TextField } from "@mui/material";



const VerifyPassword = ({ onSubmit: moveToNext }) => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    async function handleVerifyPassword(values) {
        const { payload } = await dispatch(varifyPasswordEmail(values));
        if (payload.data.message === "success") {
            moveToNext();
        }else{
            console.log(payload.data.message);
        }
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

    return (

        <div className=' m-auto container text-dark mt-5'>
            <h2 className={`${styles.pageHead} m-auto text-center mb-2`}>
                Verify Password
            </h2>
            <form onSubmit={formik.handleSubmit} className='p-5 pt-2 row'>

                <div className="form-group mb-3">
                    {error ? (
                        <div className="ps-2 alert alert-danger mb-4">{error}</div>
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
                        Verify
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default VerifyPassword
