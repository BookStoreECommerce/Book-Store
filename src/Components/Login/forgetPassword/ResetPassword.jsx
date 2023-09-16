import { useFormik } from 'formik'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup'
import axios from 'axios'
import { Await, Link, Navigate } from 'react-router-dom'



const ResetPassword = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState('')


    async function handleResetPassword(values) {
        console.log("password", values.password);
        console.log("confirm password", values.confirmPassword);
        setIsLoading(true);
        let { data } = await axios.post('', values).catch((error) => {
            setIsLoading(false);
            setMessageError(`${error.response.data.errors.param}:${error.response.data.errors.msg}`)
        });
        if (data.message === 'success') {
            setIsLoading(false)
            Navigate('/')
        }

    }


    let validationSchema = Yup.object({
        password: Yup.string().required("password is required").min(9),
        confirmPassword: Yup.string().required("confirmPassword is required").oneOf([Yup.ref('password')],"password and confirmPassword doesn't match")
    })



    let formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: handleResetPassword
    });

    return (
        <>
            <div className='w-50 m-auto container text-dark mt-5'>
                <h2 className='text-center text-info'>Reset Password</h2>
                {messageError.length > 0 ? <span className='alert alert-danger'>{messageError}</span> : null}
                <form onSubmit={formik.handleSubmit} className='p-5 pt-2 row'>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} id="password" name="password" placeholder="Password" />
                        {formik.errors.password && formik.touched.password ? <small className="form-text text-danger">{formik.errors.password}</small> : null}

                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="confirmpassword">confirm Password:</label>
                        <input type="password" className="form-control" onBlur={formik.handleBlur} value={formik.values.confirmPassword} onChange={formik.handleChange} id="confirmPassword" name="confirmPassword" placeholder="confirm password" />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword ? <small className="form-text text-danger">{formik.errors.confirmPassword}</small> : null}

                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        </>
    )
}

export default ResetPassword
