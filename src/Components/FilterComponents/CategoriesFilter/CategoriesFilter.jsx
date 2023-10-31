import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterObj } from "../../../Redux/Slicies/filterSlice";

const CategoriesFilter = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.favourites);
  const [myOptions, setMyOptions] = useState([]);

  const searchCategories = () => {
    setMyOptions(allCategories.map((ele) => ({name: ele.name, slug: ele.slug})));
  };
  
  const setFilterCategory = (event , value) => {
    if (value !== null && myOptions.includes(value)) {
      dispatch(setFilterObj({method: 'add', name: 'category', value}));
    }
  };

  return (
    <div>
      <h6>Categories</h6>
      <Autocomplete
        style={{ width: "75%" }}
        freeSolo
        autoComplete
        autoHighlight
        onChange={setFilterCategory}
        options={myOptions}
        getOptionLabel = {(option) => (option.name || '')}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={searchCategories}
            onFocus={() => setMyOptions(allCategories.map((ele) => ({name: ele.name, slug: ele.slug})))}
            variant="outlined"
            placeholder="Categories"
            name="categories"
            type="text"
          />
        )}
      />
      <hr />
    </div>
  );
};

export default CategoriesFilter;
