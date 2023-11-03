import { useFormik } from 'formik'
// import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../../AuthComponents/Login/Login.module.css";

import * as Yup from 'yup'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useEffect } from 'react';
import { resetPassword } from '../../../Redux/Slicies/authActions';
import { clearError } from '../../../Redux/Slicies/authSlice';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading } = useSelector((state) => state.auth);



    async function handleResetPassword(values) {
        const { payload } = await dispatch(resetPassword(values));
        if (payload.message === "success") {
            navigate("/")
        } else {
        }
    }

    const getCharacterValidationError = (str) => {
        return `Password must have at least 1 ${str} character`;
    };
    
    let validationSchema = Yup.object({
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
    })



    let formik = useFormik({
        initialValues: {
            password: '',
            rePassword: '',
        },
        validationSchema,
        onSubmit: handleResetPassword
    });
    useEffect(() => {
        dispatch(clearError());

    }, [dispatch]);
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

                <div className="mb-3">
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
                        error={formik.errors.rePassword && formik.touched.rePassword && true}
                        helperText={formik.errors.rePassword}
                        id="reoutlined-error"
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
