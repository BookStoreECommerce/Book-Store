import { useFormik } from 'formik'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../Login.module.css";

import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { resetPassword } from '../../../Redux/Slicies/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, msgError } = useSelector((state) => state.auth);

    async function handleResetPassword(values) {
        const { payload } = await dispatch(resetPassword(values));
        console.log(values);
        if (payload.message === "success") {
            navigate("/")
        }
    }


    let validationSchema = Yup.object({
        password: Yup.string().required("password is required").min(9),
        rePassword: Yup.string().required("rePassword is required").oneOf([Yup.ref('password')], "password and rePassword doesn't match")
    })



    let formik = useFormik({
        initialValues: {
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: handleResetPassword
    });

    return (

        <div className=' m-auto container text-dark mt-5'>
            <div className={` fa-stack fa-passwd-reset d-block m-auto ${styles.fastack}`} >
                <i className="fa fa-undo fa-stack-2x"></i>
                <i className="fa fa-lock fa-stack-1x"></i>
            </div>
            <h2 className={`${styles.pageHead} m-auto text-center mb-2`}>
                Reset Password
            </h2>
            <form onSubmit={formik.handleSubmit} className='p-5 pt-2 row'>

                <div className="form-group mb-3">
                    <TextField
                        onChange={formik.handleChange}
                        error={formik.errors.password && formik.touched.password && true}
                        helperText={formik.errors.password}
                        id="outlined-error"
                        label="password"
                        className="w-100"
                        name="password"
                        type="password"
                        onBlur={formik.handleBlur}
                        margin="dense"
                    />
                </div>

                <div className="form-group mb-3">
                    <TextField
                        onChange={formik.handleChange}
                        error={
                            formik.errors.rePassword && formik.touched.rePassword && true
                        }
                        helperText={formik.errors.rePassword}
                        id="outlined-error"
                        label="Confirm Password"
                        className="w-100"
                        name="rePassword"
                        type="password"
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
                        Change Password
                    </Button>
                </div>
            </form>
        </div>

    )
}

export default ResetPassword
