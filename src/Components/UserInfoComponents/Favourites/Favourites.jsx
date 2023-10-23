
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  setFavCategories,
} from "../../../Redux/Slicies/favActions";
import { useFormik } from "formik";
import styles from "./Favourites.module.css";
import * as Yup from "yup";
import { Button } from "@mui/material";

const Favourites = () => {
  const dispatch = useDispatch();
  const { isLoading, msgError, allCategories } = useSelector(
    (state) => state.favourites
  );
  const { user } = useSelector((state) => state.auth);
  const onlyNames = user.fav_cats.map((ele) => ele.name);
  const [myOptions, setMyOptions] = useState([]);
  const [chosenFavCategory, setChosenFavCategory] = useState(onlyNames || []);

  useEffect(() => {
    if (allCategories.length === 0) dispatch(getAllCategories());
  }, [dispatch, allCategories]);

  const searchCategories = () => {
    setMyOptions(allCategories.map((ele) => ele.name));
  };

  const setfavCategory = (event, value) => {
    const chosenFavCategoryArray = [...chosenFavCategory];
    if (value !== null && !chosenFavCategoryArray.includes(value) && myOptions.includes(value)) {
      chosenFavCategoryArray.push(value);
      formik.values.favCategory = value;
    }
    setChosenFavCategory(chosenFavCategoryArray);
  };

  const deletefavCategory = (index) => {
    const deletedFavCategoryArray = [...chosenFavCategory];
    deletedFavCategoryArray.splice(index, 1);
    setChosenFavCategory(deletedFavCategoryArray);
  };

  const validationSchema = Yup.object({
    favCategory: Yup.string().required("This field is required"),
  });

  let categoriesFilterArray = [];
  const concatIdAndName = () => {
    for (let i = 0; i < chosenFavCategory.length; i++) {
      categoriesFilterArray.push(
        allCategories.find((category) => category.name === chosenFavCategory[i])
      );
    }
  };

  const handleSubmit = async () => {
    concatIdAndName();
    await dispatch(setFavCategories(categoriesFilterArray));
  };

  const formik = useFormik({
    initialValues: {
      favCategory: "",
    },
    validationSchema,
    isInitialValid: false,
  });

  return (
    <>
      <div className={`favourites row ${styles.row} justify-content-center`}>
        <form
          className="d-flex col-11 col-lg-10 text-center flex-column gap-md-4 gap-3" 
          onSubmit={formik.handleSubmit}
          noValidate
        >
          {msgError ? (
            <div className="ps-2 alert alert-danger mb-4">{msgError}</div>
          ) : null}
          <h3 className={`${styles.mainTitle}`}>
            Add you Favourite Categories
          </h3>
          <Autocomplete
            style={{ width: "75%" }}
            freeSolo
            autoComplete
            autoHighlight
            onChange={setfavCategory}
            options={myOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={searchCategories}
                onFocus={() =>
                  setMyOptions(allCategories.map((ele) => ele.name))
                }
                variant="outlined"
                label="Favourite Categories"
                name="favCategory"
                type="text"
                error={
                  formik.errors.favCategory &&
                  formik.touched.favCategory &&
                  true
                }
                helperText={formik.errors.favCategory}
                onBlur={formik.handleBlur}
              />
            )}
          />

          <div
            className={`d-flex flex-wrap gap-2 w-100 px-3 py-4 ${styles.FavCategoryWrapper}`}
          >
            {chosenFavCategory &&
              chosenFavCategory.map((FavCategory, index) => (
                <div
                  key={index}
                  className={`p-2 rounded ${styles.FavCategory}`}
                >
                  {FavCategory}
                  <i
                    className={`fa-regular fa-circle-xmark ms-2 ${styles.xmarkPointer}`}
                    onClick={() => {
                      deletefavCategory(index);
                    }}
                  ></i>
                </div>
              ))}
          </div>

          <Button
            variant="outlined"
            sx={{
              padding: "5px 15px !important",
            }}
            onClick={() => handleSubmit()}
            endIcon={
              isLoading &&
              allCategories.length !== 0 && (
                <i className="fas fa-spinner fa-spin"></i>
              )
            }
            className={`mainBtn align-self-end my-3 ${styles.wFitContent}`}
            disabled={chosenFavCategory.length !== 0 ? false : true}
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default Favourites;
