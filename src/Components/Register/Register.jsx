import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import styles from "./Register.module.css";
import SocialMediaBtns from "../ReusableComponents/SocialMediaBtns/SocialMediaBtns";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/Slicies/authSlice";
import CustomizedDialogs from "../Dialog/Dialog";
import { registerVerifyModal } from "../../Redux/Slicies/dialogSlice";


export const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, msgError } = useSelector((state) => state.auth);
  const { registerShow } = useSelector(({dialog}) => dialog);

  const handleSubmit = async (values) => {
    delete values.privacyCheck;
    const {payload} = await dispatch(register(values));
    if(payload.message === "success"){
      dispatch(registerVerifyModal())
    }
  };

  let validationSchema = Yup.object({
    userName: Yup.string()
      .required("Name is required")
      .matches(
        /^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/,
        "Name must start with 3:8 letters (a-z)"
      ),
    email: Yup.string()
      .required("Email is required")
      .email("Please Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>]{9,}$/,
        `Password must contains:, - At least one uppercase letter.,- At least one lowercase letter.,- At least one digit.,- At least one special character.,- At least 9 characters long.`
      ),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Password is not matched"),
    privacyCheck: Yup.boolean().oneOf([true], "Please accept privacy policy"),
  });

  let formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      rePassword: "",
      privacyCheck: false,
    },
    validationSchema,
    isInitialValid: false,
    onSubmit: handleSubmit,
  });


  return (
    <CustomizedDialogs show={registerShow}  >
      <div className="p-2">
        <h4 className="mainTitle text-center">CREATE YOUR ACCOUNT</h4>
        <form onSubmit={formik.handleSubmit} noValidate>
          {msgError ? (
            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
          ) : null}

          <TextField
            onChange={formik.handleChange}
            error={formik.errors.userName && formik.touched.userName && true}
            helperText={formik.errors.userName}
            id="outlined-error"
            label="Name"
            className="w-100"
            name="userName"
            type="text"
            onBlur={formik.handleBlur}
            margin="dense"
          />
          <TextField
            onChange={formik.handleChange}
            error={formik.errors.email && formik.touched.email && true}
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

          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="form-check">
              <input
                className="form-check-input mainCheckbox"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="checkbox"
                value={formik.values.privacyCheck}
                id="privacyCheck"
                name="privacyCheck"
              />
              <label
                className="form-check-label text-muted"
                htmlFor="privacyCheck"
              >
                I agree to the{" "}
                <a className="text-muted" href="\">
                  privacy policy
                </a>
                .
              </label>
              {formik.errors.privacyCheck && formik.touched.privacyCheck ? (
                <p className="mt-1 text-danger mb-0">
                  {formik.errors.privacyCheck}
                </p>
              ) : null}
            </div>

            <Button
              variant="outlined"
              type="submit"
              endIcon={
                isLoading ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-arrow-right"></i>
                )
              }
              className={`mainBtn`}
              disabled={formik.isValid ? false : true}
            >
              Next
            </Button>
          </div>
        </form>

        <div className="d-flex gap-1 text-muted justify-content-center">
          <div>Already have an account?</div>
          <a className="text-muted" href="\">
            Login
          </a>
        </div>

        <div className="d-flex align-items-baseline justify-content-between">
          <div className={styles.leftLine}></div>
          <span className={styles.or}>or</span>
          <div className={styles.rightLine}></div>
        </div>

        <SocialMediaBtns />
      </div>
    </CustomizedDialogs>
  );
};
