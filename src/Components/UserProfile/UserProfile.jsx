import React from "react";
import styles from "./UserProfile.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { userProfile } from "../../Redux/Slicies/authSlice";

export const UserProfile = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    console.log(values);
    const {payload} = await dispatch(userProfile(values));
    console.log(payload);
    // if(payload.message === "success"){
    //   dispatch(registerVerifyModal())
    // }
  };

  let validationSchema = Yup.object({
    userName: Yup.string().max(20).min(4).matches(
        /^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/,
        "Name must start with 3:8 letters (a-z)"
      ),
      address: Yup.string(),
      city: Yup.string(),
      phone: Yup.string().matches(/^(\+2)?(01)[0125][0-9]{8}$/, 'Phone must be valid Egyption number'),
      age: Yup.number().min(12, 'Age must be greater than 12').max(99, 'Age must be less than 99'),
      gender: Yup.string().oneOf(['Male', 'Female']),
  });

  let formik = useFormik({
    initialValues: {
      userName: "",
      address: "",
      city: "",
      phone: "",
      age: 0,
      gender: "",
    },
    validationSchema,
    isInitialValid: false,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="container w-50 mt-5 p-2">
        <div className="text-center">
          <i
            className={`fa-solid fa-circle-user mb-2 ${styles.iconFontSize}`}
          ></i>
          <h4 className="mainTitle">PERSONAL INFORMATION</h4>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.errors.userName && formik.touched.userName && true}
            helperText={formik.errors.userName}
            id="outlined-error"
            label="Name"
            className="w-100"
            name="userName"
            type="text"
            margin="dense"
          />

          <div className="addressGroup d-flex justify-content-between">
            <TextField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.errors.address && formik.touched.address && true}
              helperText={formik.errors.address}
              id="outlined-error"
              label="Address"
              className={`${styles.address}`}
              name="address"
              type="text"
              margin="dense"
            />

            <TextField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.errors.city && formik.touched.city && true}
              helperText={formik.errors.city}
              id="outlined-error"
              label="City"
              className={`${styles.city}`}
              name="city"
              type="text"
              margin="dense"
            />
          </div>

          <TextField
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.errors.phone && formik.touched.phone && true}
            helperText={formik.errors.phone}
            id="outlined-error"
            label="Mobile Phone"
            className={`w-100 ${styles.phone}`}
            name="phone"
            type="text"
            margin="dense"
          />

          <div className="ageAndGender d-flex justify-content-between">
            <TextField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.errors.age && formik.touched.age && true}
              helperText={formik.errors.age}
              id="outlined-error"
              label="Age"
              className={`${styles.age}`}
              name="age"
              type="number"
              margin="dense"
            />

            <FormControl className="flex-row align-items-center gap-2">
              <FormLabel id="demo-controlled-radio-buttons-group">
                Gender:
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="gender"
                onChange={formik.handleChange}
              >
                <div className="d-flex">
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    className={`text-muted`}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    className={`text-muted`}
                    label="Male"
                  />
                </div>
              </RadioGroup>
            </FormControl>
          </div>

          {/* Favorite Categories */}

          <div className="d-flex justify-content-between mt-1">
            <Button
              variant="outlined"
              className={`mainBtn ${styles.mainBtnWidth}`}
            >
              Skip
            </Button>

            <Button
              variant="outlined"
              type="submit"
              endIcon={
                isLoading ? <i className="fas fa-spinner fa-spin"></i> : ""
              }
              className={`mainBtn ${styles.mainBtnWidth}`}
              disabled={formik.isValid ? false : true}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
