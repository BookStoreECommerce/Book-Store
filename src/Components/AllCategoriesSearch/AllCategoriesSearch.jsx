import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../Redux/Slicies/favActions";

const AllCategoriesSearch = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.favourites);
  const [myOptions, setMyOptions] = useState([]);
  const [chosenCategory, setChosenCategory] = useState([]);

  useEffect(() => {
    if (allCategories.length === 0) dispatch(getAllCategories());
  }, [dispatch, allCategories]);

  const searchCategories = () => {
    setMyOptions(allCategories.map((ele) => ele.name));
  };

  return (
    <>
      <Autocomplete
        style={{ width: "75%" }}
        freeSolo
        autoComplete
        autoHighlight
        // onChange={setfavCategory}
        options={myOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={searchCategories}
            onFocus={() => setMyOptions(allCategories.map((ele) => ele.name))}
            variant="outlined"
            label="Categories"
            name="categories"
            type="text"
          />
        )}
      />
    </>
  );
};

export default AllCategoriesSearch;
