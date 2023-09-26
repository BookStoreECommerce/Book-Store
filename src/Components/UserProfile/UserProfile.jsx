import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router";
import { userProfile } from "../../Redux/Slicies/authActions";
import { clearError, setUser } from "../../Redux/Slicies/authSlice";

const UserProfile = () => {
  const navigate = useNavigate();
  const { isLoading, msgError, user } = useSelector((state) => state.auth);
  const [data, setData] = useState(user);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(clearError());  
  }, [dispatch]);

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Name is required")
      .max(20, "Name must be at most 20 characters")
      .min(4, "Name must be at least 4 characters")
      .matches(
        /^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/,
        "Name must start with 3:8 letters (a-z)"
      ),
    address: Yup.string(),
    city: Yup.string(),
    phone: Yup.string().matches(
      /^(\+2)?(01)[0125][0-9]{8}$/,
      "Phone must be valid Egyption number"
    ),
    age: Yup.number()
      .min(12, "Age must be greater than 12")
      .max(99, "Age must be less than 99"),
    gender: Yup.string(),
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    isValid,
  } = useFormik({
    initialValues: {
      userName: data.userName,
      address: data.address,
      city: data.city,
      phone: data.phone,
      age: data.age,
      gender: data.gender,
    },
    validationSchema,
    isInitialValid: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const myHandleSubmit = async (values) => {
    if (isValid) {
      Object.keys(values).forEach((key) => {
        if (values[key] === "") {
          delete values[key];
        }
      });
      const { payload } = await dispatch(userProfile(values));
      if (payload.message === "success") {
        dispatch(setUser(values))
        navigate("");
      }
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({...prev, [name]: value}))
  };


  return (
    <>
      <div className="profile row justify-content-center">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="d-flex col-10 col-lg-8 text-center flex-column gap-md-4 gap-3"
        >
          {msgError ? (
            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
          ) : null}

          <div className="d-flex align-items-center gap-3 justify-content-center">
            <i className={`fa-solid fa-circle-user ${styles.iconFontSize}`}></i>
            <h4 className={`${styles.mainTitle}`}>{user.userName}</h4>
          </div>

          <div className="nameAndPhone d-flex flex-column flex-md-row gap-md-0 gap-3 justify-content-evenly">
            <TextField
              onBlur={handleBlur}
              error={errors.userName && touched.userName && true}
              helperText={errors.userName}
              id="outlined-error"
              label="Name"
              className="col-md-5 col-12"
              name="userName"
              type="text"
              onChange={(e) => {
                inputHandler(e);
                handleChange(e);
              }}
              value={values.userName}
              margin="dense"
            />

            <TextField
              onBlur={handleBlur}
              error={errors.phone && touched.phone && true}
              helperText={errors.phone}
              id="outlined-error"
              label="Mobile Phone"
              className={`col-md-5 col-12`}
              name="phone"
              type="text"
              onChange={(e) => {
                inputHandler(e);
                handleChange(e);
              }}
              value={values.phone}
              margin="dense"
            />
          </div>

          <div className="addressGroup d-flex flex-column flex-md-row gap-md-0 gap-3 justify-content-evenly">
            <TextField
              onBlur={handleBlur}
              error={errors.address && touched.address && true}
              helperText={errors.address}
              id="outlined-error"
              label="Address"
              className={`col-md-5 col-12`}
              name="address"
              type="text"
              onChange={(e) => {
                inputHandler(e);
                handleChange(e);
              }}
              value={values.address}
              margin="dense"
            />

            <TextField
              onBlur={handleBlur}
              error={errors.city && touched.city && true}
              helperText={errors.city}
              id="outlined-error"
              label="City"
              className={`col-md-5 col-12`}
              name="city"
              type="text"
              onChange={(e) => {
                inputHandler(e);
                handleChange(e);
              }}
              value={values.city}
              margin="dense"
            />
          </div>

          <div className="ageAndGender d-flex flex-column flex-md-row gap-md-0 gap-3 justify-content-evenly">
            <TextField
              onBlur={handleBlur}
              error={errors.age && touched.age && true}
              helperText={errors.age}
              id="outlined-error"
              label="Age"
              className={`col-md-5 col-12`}
              name="age"
              type="number"
              onChange={(e) => {
                inputHandler(e);
                handleChange(e);
              }}
              value={values.age}
              margin="dense"
            />

            <FormControl className="flex-row align-items-center gap-2 col-md-5 col-12">
              <FormLabel id="demo-controlled-radio-buttons-group">
                Gender:
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="gender"
                onChange={(e) => {
                  inputHandler(e);
                  handleChange(e);
                }}
                value={values.gender}
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

          <div className="d-flex justify-content-center gap-3 my-3">
            <Button
              variant="outlined"
              className={`mainBtn ${styles.mainBtnWidth}`}
              onClick={() => navigate("/")}
            >
              Skip
            </Button>

            <Button
              variant="outlined"
              onClick={() => myHandleSubmit(values)}
              endIcon={
                isLoading ? <i className="fas fa-spinner fa-spin"></i> : ""
              }
              className={`mainBtn ${styles.mainBtnWidth}`}
              disabled={isValid ? false : true}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
