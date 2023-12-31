import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../../../Redux/Slicies/filterActions";
import { setFilterObj } from "../../../Redux/Slicies/filterSlice";

const AuthorFilter = () => {
  const dispatch = useDispatch();
  const { allAuthors } = useSelector((state) => state.booksFilter);
  const [myOptions, setMyOptions] = useState([]);

  useEffect(() => {
    if (allAuthors.length === 0) dispatch(getAllAuthors());
  }, [dispatch, allAuthors]);

  const searchAuthor = () => {
    setMyOptions(allAuthors.map((ele) => ele));
  };
  
  const setFilterAuthor = (event , value) => {
    if (value !== null && myOptions.includes(value)) {
      dispatch(setFilterObj({method: 'add', name: 'author', value}));
    }
  };

  return (
    <div>
      <h6>Author</h6>
      <Autocomplete
        style={{ width: "100%" }}
        freeSolo
        autoComplete
        autoHighlight
        onChange={setFilterAuthor}
        options={myOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={searchAuthor}
            onFocus={() => setMyOptions(allAuthors.map((ele) => ele))}
            variant="outlined"
            placeholder="Author"
            name="author"
            type="text"
          />
        )}
      />
      <hr />
    </div>
  );
};

export default AuthorFilter;
