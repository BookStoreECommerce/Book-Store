// import React from 'react'

// const Favourites = () => {
//   return <>
//     <div className="text-center">Favourites</div>
//     </>
// }

// export default Favourites;

import React, { useEffect, useState } from "react";
// import TextField from '@material-ui/core/TextField';
import TextField from "@mui/material/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../Redux/Slicies/favActions";

const Favourites = () => {
  const dispatch = useDispatch();
  const { isLoading, msgError, allCategoriesName } = useSelector(
    (state) => state.favourites
    );
    const [myOptions, setMyOptions] = useState([]);
    
    console.log(myOptions);

    useEffect(() => {
      setMyOptions(allCategoriesName)
    },[allCategoriesName])

  const getDataFromAPI = () => {
     dispatch(getAllCategories());
  };

  
  return (
    <>
      <div>
        <h3>Favourites</h3>
        <Autocomplete
          style={{ width: 500 }}
          freeSolo
          autoComplete
          autoHighlight
          options={myOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={getDataFromAPI}
              variant="outlined"
              label="Search Box"
            />
          )}
        />
      </div>
    </>
  );
};

export default Favourites;
