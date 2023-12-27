import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import classes from "./UserCheckoutDetails.module.css";
import { addOrder } from "../../Redux/Slicies/checkoutActions";

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
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]*$/, "Phone number is valid."),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
  });

  return (
    <Formik
      initialValues={{
        userName: user.userName,
        phone: user.phone,
        city: user.city,
        address: user.address,
        country: user.country,
        paymentMethod: "cash",
      }}
      validationSchema={validationSchema}
      validateOnMount={true}
      onSubmit={(values) => {
        const { address, city, country, phone, userName: name, paymentMethod } =
        values;
        const checkoutDetails = {
          name, paymentMethod,
          shippingAddress: { address, city, country, phone },
          // successCallbackURL: window.location.origin
        };
        dispatch(addOrder(checkoutDetails));
      }}
    >
      {({
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        values
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
            defaultValue={user.phone}
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
            defaultValue={user.country}
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
            defaultValue={user.city}
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
            defaultValue={user.address}
            margin="dense"
          />

          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Payment Method
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="paymentMethod"
              value={values.paymentMethod}
              onChange={(e) => handleChange(e)}
            >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="online" control={<Radio />} label="Online" />
            </RadioGroup>
          </FormControl>
          <span></span>
          {/* {values.paymentMethod === "cash"?<span>cash</span>: <span>online</span>} */}
          <div className="d-flex justify-content-start gap-3 mb-3">
            <Button
              variant="outlined"
              type="submit"
              endIcon={
                isLoading ? <i className="fas fa-spinner fa-spin"></i> : ""
              }
              disabled={!isValid}
            >
              Order Now
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserCheckoutDetails;
