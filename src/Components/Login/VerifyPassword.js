import { useFormik } from 'formik'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { Navigate } from 'react-router-dom'



const VerifyPassword = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState('')


    async function handleVerifyPassword(values) {
        console.log("verifyCode", values.verifyCode);
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





    let formik = useFormik({
        initialValues: {
            verifyCode: '',
        },
        onSubmit: handleVerifyPassword
    });

    return (
        <>
            <div className='w-50 m-auto container text-dark mt-5'>
                <h2 className='text-center text-info'>Verify Password</h2>
                {messageError.length > 0 ? <span className='alert alert-danger'>{messageError}</span> : null}
                <form onSubmit={formik.handleSubmit} className='p-5 pt-2 row'>

                    <div className="form-group mb-3">
                        <label htmlFor="verifyCode">Verify Password:</label>
                        <input type="verifyCode" className="form-control" onBlur={formik.handleBlur} value={formik.values.verifyCode} onChange={formik.handleChange} id="verifyCode" name="verifyCode" placeholder="Password" />
                        {formik.errors.verifyCode && formik.touched.password ? <small className="form-text text-danger">{formik.errors.password}</small> : null}

                    </div>



                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        </>
    )
}

export default VerifyPassword
