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
import {getUserProfile,setUser, userProfile,} from "../../Redux/Slicies/authSlice";
import { useNavigate } from "react-router";

export const UserProfile = () => {
  const [disabled, setDisabel] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const {footerH, navH, footerNoMargin} = useSelector((state) => state.app);
  const navigate = useNavigate();
  const { isLoading, msgError, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Name is required")
      .max(20)
      .min(4)
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
    gender: Yup.string().oneOf(["Male", "Female"]),
  });

  const { values,  handleChange, handleBlur,  handleSubmit,  touched, errors, setValues,} = useFormik({
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
    Object.keys(values).flatMap((key) => {
      if (values[key] === "") {
        delete values[key];
      }
    });
    const { payload } = await dispatch(userProfile(values));
    if (payload.message === "success") {
      navigate("/");
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

  return (
    <>
      {!isLoading && (
        // <div className="container w-50 mt-5 p-2">
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: `${navH + (footerH/3)}px`
          }}
        >
          <Box
            // maxWidth="xs"
            // minWidth="xs"
            // width="xl"
            sx={(theme) => ({
              maxWidth : theme.breakpoints.up()
            })}
          >
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

            <div className="addressGroup d-flex justify-content-between">
              <TextField
                onBlur={handleBlur}
                error={errors.address && touched.address && true}
                helperText={errors.address}
                id="outlined-error"
                label="Address"
                className={`${styles.address}`}
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
                className={`${styles.city}`}
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

            <div className="ageAndGender d-flex justify-content-between">
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

            <div className="d-flex justify-content-between mt-1">
              <Button
                variant="outlined"
                className={`mainBtn ${styles.mainBtnWidth}`}
                onClick={() => setDisabel((prev) => !prev)}
              >
                {disabled ? 'Edite': 'Skip'}
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
                  display: disabled ? 'none': 'block'
                }}
              >
                Save
              </Button>
            </div>
          </form>
          </Box>
        {/* </div> */}
        </Box>
      )}
    </>
  );
};
