import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import { TextField, Button } from "@mui/material";
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
    phone: Yup.string().required("Phone is required").matches(
        /^[0-9]*$/, "Phone number is valid."
      ),
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
        const { address, city, country, phone, userName, paymentMethod } =
          values;
        const checkoutDetails = {
          shippingaddress: { address, city, country, phone },
          name: userName,
          paymentMethod,
        };
        console.log(checkoutDetails);
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
          onSubmit={!Object.values(errors).length && handleSubmit}
          noValidate
          className={classes["checkout-form"]}
        >
          {msgError ? (
            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
          ) : null}
          <TextField
            onBlur={handleBlur}
            error={errors.userName && touched.userName && true}
            helperText={errors.userName && touched.userName && errors.userName}
            id="outlined-error"
            label="Full name"
            className={classes["input-name"]}
            name="userName"
            type="text"
            onChange={(e) => handleChange(e)}
            defaultValue={user.userName}
            margin="dense"
          />

          <TextField
            onBlur={handleBlur}
            error={errors.phone && touched.phone && true}
            helperText={errors.phone && touched.phone && errors.phone}
            id="outlined-error"
            label="Mobile Phone"
            className={classes["input-phone"]}
            name="phone"
            type="text"
            onChange={(e) => handleChange(e)}
            margin="dense"
          />

          <TextField
            onBlur={handleBlur}
            error={errors.country && touched.country && true}
            helperText={errors.country && touched.country && errors.country}
            id="outlined-error"
            label="Country"
            className={classes["input-country"]}
            name="country"
            type="text"
            onChange={(e) => handleChange(e)}
            margin="dense"
          />

          <TextField
            onBlur={handleBlur}
            error={errors.city && touched.city && true}
            helperText={errors.city && touched.city && errors.city}
            id="outlined-error"
            label="City"
            className={classes["input-city"]}
            name="city"
            type="text"
            onChange={(e) => handleChange(e)}
            margin="dense"
          />

          <TextField
            onBlur={handleBlur}
            error={errors.address && touched.address && true}
            helperText={errors.address && touched.address && errors.address}
            id="outlined-error"
            label="Address"
            className={classes["input-address"]}
            name="address"
            type="text"
            onChange={(e) => handleChange(e)}
            margin="dense"
          />

          <div className="d-flex justify-content-center gap-3 my-3">
            <Button
              variant="outlined"
              type="submit"
              endIcon={
                isLoading ? <i className="fas fa-spinner fa-spin"></i> : ""
              }
              disabled={!isValid || !Object.keys(touched).length}
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
