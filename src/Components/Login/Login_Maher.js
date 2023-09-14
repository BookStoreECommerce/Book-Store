import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../Redux/Slicies/authSlice';
import styles from './Login.module.css'
import { TextField, } from "@mui/material";
import Button from '@mui/material/Button';




const Login = () => {
    // const [isLoading, setIsLoading] = useState(false);
    const { isLoading, token , error } = useSelector(({auth}) => auth);
    const dispatch = useDispatch()
  

    const handleLogin = async (values) => {
        console.log(values);
        dispatch(signin(values))

    }

    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('email is invalid'),
        // password: Yup.string().required("password is required").min(9)
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
            
            <>
      <div className="container w-75 mx-auto py-4">
        <h4 className="mainTitle text-center">Log In</h4>
        <form onSubmit={formik.handleSubmit} noValidate>
          {error ? (
            <div className="ps-2 alert alert-danger mb-4">{error}</div>
          ) : null}

          <TextField
            onChange={formik.handleChange}
            // error={formik.errors.email && formik.touched.email && true}
            helperText={formik.errors.email}
            id="outlined-error"
            label="email"
            className="w-100"
            name="email"
            type="text"
            onBlur={formik.handleBlur}
            margin="dense"
          />
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
         


          <div className="d-flex justify-content-between align-items-center mt-2">
            

            <Button
              variant="outlined"
              type="submit"
              endIcon={isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fa-solid fa-arrow-right"></i>}
              className={`mainBtn`}
              disabled={formik.isValid ? false : true}
            >
              Next
            </Button>
          </div>
        </form>

        <div className="d-flex gap-1 text-muted justify-content-center">
          <div>Don't have Account?</div>
          <a className="text-muted" href="/register">Register Now</a>
        </div>

        <div className="d-flex align-items-baseline justify-content-between">
          <div className={styles.leftLine}></div>
          <span className={styles.or}>or</span>
          <div className={styles.rightLine}></div>
        </div>

        {/* <SocialMediaBtns/> */}
      </div>
    </>
        </>

    )
}

export default Login
