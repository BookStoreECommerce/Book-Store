import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../Redux/Slicies/authSlice';
import styles from './Login.module.css'
import axios from 'axios';
import { baseUrl } from '../../util/util';



const Login = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState('')
    const dispatch = useDispatch()
    const { isLoading, token } = useSelector(state => {
        // console.log(state.auth);
        return state.auth
    });
    // console.log(auth);
    // async function handleLogin(values) {
    //     console.log(values);
    //     setIsLoading(true);
    //     let { data } = await axios.post('https://book-store-an5l.onrender.com/api/v1/auth/signin', values).catch((error) => {
    //         console.log(error);
    //         setIsLoading(false);
    //         // setMessageError(`${error.response.data.errors.param}:${error.response.data.errors.msg}`)
    //     });
    //     if (data.message === 'success') {
    //         setIsLoading(false)
    //         Navigate('/')
    //     }
    //     console.log(data);
    // }

    const handleLogin = async (values) => {
        console.log(values);
        dispatch(signin(values))

    }

    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('email is invalid'),
        password: Yup.string().required("password is required").min(9)
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: handleLogin
    });

    return (
        <>
            <div className='w-50 m-auto container text-dark mt-5'>
                <h2 className='m-auto text-center'>Login</h2>
                {messageError.length > 0 ? <span className='alert alert-danger'>{messageError}</span> : null}
                <form onSubmit={formik.handleSubmit} className='p-5 row'>

                    <div className="form-group mb-3">
                        <label className={`${styles.hintColor} mb-2 `} htmlFor="email">Email *</label>
                        <input type="text" className={` ${styles.bgBtn} form-control mb-1`} onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" name="email" aria-describedby="emailHelp" />
                        {formik.errors.email && formik.touched.email ? <small className="form-text text-danger text-center">{formik.errors.email}</small> : null}

                    </div>

                    <div className="form-group mb-3">
                        <label className={`${styles.hintColor} mb-2 `} htmlFor="password">Password *</label>
                        <input type="password" className={` ${styles.bgBtn} form-control mb-1`} onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} id="password" name="password" />
                        {formik.errors.password && formik.touched.password ? <small className="form-text text-danger">{formik.errors.password}</small> : null}

                    </div>
                    <p className=' text-end m-auto text-dark mb-3'>
                        <Link to="/forgotPassword" className={`${styles.forgotPpassword}`}>Forgot password ?</Link>
                    </p>
                    {!isLoading ? <button type="submit" className="btn btn-info">Login</button>
                        : <button type="submit" className="btn btn-info">loading</button>}

                </form>
            </div>
        </>

    )
}

export default Login
