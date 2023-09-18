import { useFormik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../Redux/Slicies/authSlice';
import styles from './Login.module.css'
import CustomizedDialogs from "../Dialog/Dialog";
import { FormControl, FormHelperText, IconButton, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const LoginTE = () => {

    const [messageError, setMessageError] = useState('')
    const dispatch = useDispatch()
    const { loginShow } = useSelector(({ dialog }) => dialog);
    const { isLoading, msgError} = useSelector(state => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
        // <CustomizedDialogs show={loginShow}  >
            // <div className="p-2">
                // <h4 className="mainTitle text-center">CREATE YOUR ACCOUNT</h4>

                <form onSubmit={formik.handleSubmit} className='p-5 row'>
                    {msgError ? (
                        <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
                    ) : null}
                    <TextField
                        onChange={formik.handleChange}
                        error={formik.errors.email && formik.touched.email && true}
                        helperText={formik.errors.userName}
                        label="Email"
                        className="w-100"
                        name="email"
                        type="email"
                        onBlur={formik.handleBlur}
                        margin="dense"
                    />

                    <FormControl variant="outlined" fullWidth margin="dense" error={formik.errors.password && formik.touched.password && true}>
                        <InputLabel htmlFor="password-input">Password</InputLabel>
                        <OutlinedInput
                            onChange={formik.handleChange}
                            helperText={formik.errors.password}
                            id="password-input"
                            label="password"
                            className="w-100"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            onBlur={formik.handleBlur}
                            endAdornment={
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            }
                        />
                        <FormHelperText>{formik.errors.password}</FormHelperText>
                    </FormControl>
                    {/* <div className="form-group mb-3">
                        <label className={`${styles.hintColor} mb-2 `} htmlFor="email">Email *</label>
                        <input type="text" className={` ${styles.bgBtn} form-control mb-1`} onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} id="email" name="email" aria-describedby="emailHelp" />
                        {formik.errors.email && formik.touched.email ? <small className="form-text text-danger text-center">{formik.errors.email}</small> : null}

                    </div> */}

                    {/* <div className="form-group mb-3">
                        <label className={`${styles.hintColor} mb-2 `} htmlFor="password">Password *</label>
                        <input type="password" className={` ${styles.bgBtn} form-control mb-1`} onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} id="password" name="password" />
                        {formik.errors.password && formik.touched.password ? <small className="form-text text-danger">{formik.errors.password}</small> : null}

                    </div> */}
                    <p className=' text-end m-auto text-dark mb-3'>
                        <Link to="/forgotPassword" className={`${styles.forgotPpassword}`}>Forgot password ?</Link>
                    </p>
                    {!isLoading ? <button type="submit" className="btn btn-info">Login</button>
                        : <button type="submit" className="btn btn-info">loading</button>}

                </form>
            // </div>
        // </CustomizedDialogs>
    )
}

export default LoginTE

