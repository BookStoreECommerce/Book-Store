import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../Redux/Slicies/favActions";
import { setFilterObj } from "../../../Redux/Slicies/filterSlice";

const CategoriesFilter = () => {
  const dispatch = useDispatch();
  const { allCategories } = useSelector((state) => state.favourites);
  const [myOptions, setMyOptions] = useState([]);

  useEffect(() => {
    if (allCategories.length === 0) dispatch(getAllCategories());
  }, [dispatch, allCategories]);

  const searchCategories = () => {
    setMyOptions(allCategories.map((ele) => ele.name));
  };
  
  const setFilterCategory = (event , value) => {
    const filteredCat = allCategories.filter((ele) => ele.name === value);
    dispatch(setFilterObj({method: 'add', name: 'category', value: filteredCat[0].id}));
  };

  return (
    <>
      <Autocomplete
        style={{ width: "75%" }}
        freeSolo
        autoComplete
        autoHighlight
        onChange={setFilterCategory}
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

export default CategoriesFilter;
