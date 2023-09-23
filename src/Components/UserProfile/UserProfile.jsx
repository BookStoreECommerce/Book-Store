import React, { useCallback, useEffect, useState } from "react";
import styles from "./UserProfile.module.css";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router";
import { getUserProfile, userProfile } from "../../Redux/Slicies/authActions";
import { setUser } from "../../Redux/Slicies/authSlice";
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice";

const UserProfile = () => {
  const [disabled, setDisabel] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const navigate = useNavigate();
  const { isLoading, msgError, user } = useSelector((state) => state.auth);
  const { footerH, navH, footerNoMargin } = useSelector((state) => state.app);
  const dispatch = useDispatch();
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

  const { values,  handleChange, handleBlur,  handleSubmit, touched, errors, setValues, isValid } = useFormik({
    initialValues: {
      userName: "",
      address: "",
      city: "",
      phone: "",
      age: "",
      gender: "",
    },
    validationSchema,
    isInitialValid: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const myHandleSubmit = async (values) => {
    if(isValid){
      Object.keys(values).forEach((key) => {
        // Object.keys(values).flatMap((key) => {
        if (values[key] === "") {
          delete values[key];
        }
      });
      const { payload } = await dispatch(userProfile(values));
      if (payload.message === "success") {
        navigate("/");
      }
    }
  };

  const responseFn = useCallback(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    dispatch(setUser({ name, value }));
  };

  useEffect(() => {
    if (isFirst) {
      responseFn();
      setIsFirst(false);
    }
  }, [isFirst, responseFn]);

  useEffect(() => {
    if (user !== null) {
      setValues({
        userName: user.userName,
        address: user.address || "",
        city: user.city || "",
        age: user.age || "",
        gender: user.gender || "",
        phone: user.phone || "",
      });
    }
  }, [setValues, user]);
  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin())
  }, [])

  return (
    <Box
    sx={{
      // marginTop: `${navH}px`,
      minHeight: `calc(100vh - ${footerH + navH}px)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      {!isLoading && (
        <div className="px-sm-2 px-md-3 px-lg-0 px-xl-5">
          <div className="text-center">
            <i
              className={`fa-solid fa-circle-user mb-2 ${styles.iconFontSize}`}
            ></i>
            <h4 className="mainTitle">PERSONAL INFORMATION</h4>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {msgError ? (
              <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
            ) : null}

            <TextField
              onBlur={handleBlur}
              error={errors.userName && touched.userName && true}
              helperText={errors.userName}
              id="outlined-error"
              label="Name"
              className="w-100"
              name="userName"
              type="text"
              onChange={(e) => {
                inputHandler(e);
                handleChange(e);
              }}
              value={values.userName}
              margin="dense"
              disabled={disabled}
            />

            <div className="addressGroup d-flex flex-column flex-sm-row justify-content-between">
              <TextField
                onBlur={handleBlur}
                error={errors.address && touched.address && true}
                helperText={errors.address}
                id="outlined-error"
                label="Address"
                className={`col-sm-7 col-12`}
                name="address"
                type="text"
                onChange={(e) => {
                  inputHandler(e);
                  handleChange(e);
                }}
                value={values.address}
                margin="dense"
                disabled={disabled}
              />

              <TextField
                onBlur={handleBlur}
                error={errors.city && touched.city && true}
                helperText={errors.city}
                id="outlined-error"
                label="City"
                className={`col-sm-4 col-12`}
                name="city"
                type="text"
                onChange={(e) => {
                  inputHandler(e);
                  handleChange(e);
                }}
                value={values.city}
                margin="dense"
                disabled={disabled}
              />
            </div>

            <TextField
              onBlur={handleBlur}
              error={errors.phone && touched.phone && true}
              helperText={errors.phone}
              id="outlined-error"
              label="Mobile Phone"
              className={`w-100 ${styles.phone}`}
              name="phone"
              type="text"
              onChange={(e) => {
                inputHandler(e);
                handleChange(e);
              }}
              value={values.phone}
              margin="dense"
              disabled={disabled}
            />

            <div className="ageAndGender d-flex flex-column flex-md-row justify-content-between">
              <TextField
                onBlur={handleBlur}
                error={errors.age && touched.age && true}
                helperText={errors.age}
                id="outlined-error"
                label="Age"
                className={`${styles.age}`}
                name="age"
                type="number"
                onChange={(e) => {
                  inputHandler(e);
                  handleChange(e);
                }}
                value={values.age}
                margin="dense"
                disabled={disabled}
              />

              <FormControl
                className="flex-row align-items-center gap-2"
                disabled={disabled}
              >
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

            <div className="d-flex justify-content-center gap-1 my-3">
              <Button
                variant="outlined"
                className={`mainBtn ${styles.mainBtnWidth}`}
                onClick={() => setDisabel((prev) => !prev)}
              >
                {disabled ? 'Edit': 'Skip'}
              </Button>

              <Button
                variant="outlined"
                // type="submit"
                onClick={() => myHandleSubmit(values)}
                endIcon={
                  isLoading ? <i className="fas fa-spinner fa-spin"></i> : ""
                }
                className={`mainBtn ${styles.mainBtnWidth}`}
                sx={{
                  display: disabled ? 'none' : 'block'
                }}
                disabled={isValid? false : true}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </Box>
  );
};

export default UserProfile