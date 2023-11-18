import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik, useFormik } from "formik";
import * as Yup from "yup";

import { TextField, Button, FormControlLabel } from "@mui/material";
import classes from "./UserCheckoutDetails.module.css";

const UserCheckoutDetails = () => {
  const { isLoading, msgError, user } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Name is required")
      .matches(
        /^[a-zA-Z]{3,8}([_ -]?[a-zA-Z0-9]{3,8})*$/,
        "Each name must contain at least 3 letters (a-z)"
      ),
    phone: Yup.string().required("Phone is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
  });

  return (
    <Formik
      initialValues={{ userName: user.userName, phone: "" }}
      validationSchema={validationSchema}
      initialErrors={false}
      onSubmit={(values) => {
        const { adress, city, country, phone, userName, paymentMethod } =
          values;
        const checkoutDetails = {
          shippingAdress: { adress, city, country, phone },
          name: userName,
          paymentMethod,
        };
        console.log(user.userName);
        //   dispatch(userProfile(values))
      }}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
      }) => (
        <Form
          method="post"
          onSubmit={handleSubmit}
          noValidate
          className={classes["checkout-form"]}
        >
          {msgError ? (
            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
          ) : null}
          <TextField
            onBlur={handleBlur}
            error={errors.userName && touched.userName && true}
            helperText={errors.userName}
            id="outlined-error"
            label="Full name"
            className={classes["input-name"]}
            name="userName"
            type="text"
            onChange={(e) => handleChange(e)}
            defaultValue={user.userName}
            // value={values.userName}
            margin="dense"
          />

          <TextField
            onBlur={handleBlur}
            error={errors.phone && touched.phone && true}
            helperText={errors.phone}
            id="outlined-error"
            label="Mobile Phone"
            className={classes["input-phone"]}
            name="phone"
            type="text"
            onChange={(e) => handleChange(e)}
            // value={values.phone}
            margin="dense"
          />

          <TextField
            onBlur={handleBlur}
            error={errors.country && touched.country && true}
            helperText={errors.country}
            id="outlined-error"
            label="Country"
            className={classes["input-country"]}
            name="country"
            type="text"
            onChange={(e) => handleChange(e)}
            // value={values.country}
            margin="dense"
          />

          <TextField
            onBlur={handleBlur}
            error={errors.city && touched.city && true}
            helperText={errors.city}
            id="outlined-error"
            label="City"
            className={classes["input-city"]}
            name="city"
            type="text"
            onChange={(e) => handleChange(e)}
            // value={values.city}
            margin="dense"
          />

          <TextField
            onBlur={handleBlur}
            error={errors.address && touched.address && true}
            helperText={errors.address}
            id="outlined-error"
            label="Address"
            className={classes["input-address"]}
            name="address"
            type="text"
            onChange={(e) => handleChange(e)}
            // value={values.address}
            margin="dense"
          />

          <div className="d-flex justify-content-center gap-3 my-3">
            <Button
              variant="outlined"
              type="submit"
              endIcon={
                isLoading ? <i className="fas fa-spinner fa-spin"></i> : ""
              }
              // disabled={!isValid}
            >
              Send
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserCheckoutDetails;
