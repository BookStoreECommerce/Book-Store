import { Box, Button, TextField, Typography } from "@mui/material";
import Stars from "../stars/Stars";
import Radios from "../radios/Radios";
import Styles from "./RatingQuestion.module.css";
import { Form, Formik } from "formik";

const questions = [
  {
    q: "How satisfied were you with the speed of shipping?",
    type: "option",
    name: "delivery_rating",
    options: [
      {
        value: 5,
        lable: "Very satisfied",
      },
      {
        value: 4,
        lable: "Satisfied",
      },
      {
        value: 3,
        lable: "Neutral",
      },
      {
        value: 1,
        lable: "Unsatisfied",
      },
    ],
  },
  {
    q: "How would you rate the product overall?",
    type: "rate",
    name: "delivery_packing_rating",
    options: null,
  },
  {
    q: "How long have you had the product?",
    type: "option",
    name: "product_rating",
    options: [
      {
        value: 5,
        lable: "Less  than a week",
      },
      {
        value: 4,
        lable: "A week to a month",
      },
      {
        value: 3,
        lable: "A month to a half a year",
      },
      {
        value: 1,
        lable: "Over a year",
      },
    ],
  },
  {
    q: "How satisfied or dissatisfied are you with our service?",
    type: "rate",
    options: null,
    name: "website_rating",
  },
];
const RatingQuestion = () => {
  const initialValues = {
    delivery_rating: 0,
    website_rating: 0,
    delivery_packing_rating: 0,
    product_rating: "",
    notes: "",
  };
  const handleSubmit = (e) => {
    console.log(e);
  };
  return (
    <>
      <Box
        sx={{
          flexFlow: "column",
        }}
      >
        <Box
          component={"div"}
          className={Styles.question_container}
          sx={{
            mt: 10,
            ml: 5,
            mr: 5,
            color: "#2B3A55",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            {({ values, handleChange, isValid, handleBlur }) => (
              <Form>
                {questions.map((question, i) => {
                  const { options, q, type, name } = question;
                  return (
                    <Box key={i}>
                      <Typography
                        variant="h5"
                        sx={{ fontFamily: "inherit", mb: 3 }}
                      >
                        {q}
                      </Typography>
                      {type === "rate" ? (
                        <Stars onChange={handleChange} name={name} />
                      ) : (
                        <Radios
                          options={options}
                          handleChange={handleChange}
                          name={name}
                        />
                      )}
                    </Box>
                  );
                })}
                <Typography
                  variant="h4"
                  sx={{ fontFamily: "inherit", mb: 3, color: "#ce7777" }}
                >
                  Testimonials
                </Typography>
                <TextField
                  sx={(theme) => ({
                    [theme.breakpoints.up("sm")]: {
                      width: "600px",
                    },
                    [theme.breakpoints.down("sm")]: {
                      width: "100%",
                    },
                  })}
                  placeholder="Please write ...."
                  id="standard-multiline-flexible"
                  // label=""
                  multiline
                  rows={10}
                  maxRows={10}
                  variant="outlined"
                  name="notes"
                  onChange={handleChange}
                />
                <Button
                  sx={{ my: 3, fontSize: "1.5rem", fontFamily: "inherit" }}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default RatingQuestion;
