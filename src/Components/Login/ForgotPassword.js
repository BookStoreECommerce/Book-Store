import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { Await, Link, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';


const ForgotPassword = () => {



    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState('')


    async function handleForgotPassword(values) {
        console.log("email", values.email);
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
        email: Yup.string().required('email is required').email('email is invalid'),
    })



    let formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: handleForgotPassword
    });

    return (
        <>
        <div className='w-50 m-auto container text-dark mt-5'>
        <h2 className='text-center text-info'>Forgot Password</h2>
            {messageError.length > 0 ? <span className='alert alert-danger'>{messageError}</span> : null}
            <form onSubmit={formik.handleSubmit} className='p-5 pt-2 row'>

                <div className="form-group mb-3">
                    <label htmlFor="email" className=''>Email:</label>
                    <input type="text" className="form-control" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    {formik.errors.email && formik.touched.email ? <small className="form-text text-danger text-center">{formik.errors.email}</small> : null}

                </div>


                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
            </div>
        </>

    )
}

export default ForgotPassword
