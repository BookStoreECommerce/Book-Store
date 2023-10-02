import { Autocomplete, TextField, Box } from "@mui/material";
import axiosInstance from "../../../axios/axios-instance";
import { useState } from "react";

const LiveSearch = ({ id, label, onChange, url, keyword }) => {
  const [results, setResults] = useState([]);
  const handleInputChange = async (val) => {
    const { data } = await axiosInstance(url.replace(`=${keyword}`, `=${val}`));
    const resultArr = data.result;
    if (resultArr.length) {
      setResults(resultArr);
      console.log(resultArr);
    }
  };
  return (
    <div
      className="position-absolute"
      style={{ zIndex: "9999", left: "50%", transform: "translateX(-50%)" }}
    >
      <Autocomplete
        id="country-select-demo"
        sx={{ width: 300 }}
        options={results}
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img loading="lazy" width="30" src={option.image.secure_url} />
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            onChange={(e) => handleInputChange(e.target.value)}
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  );
};

export default LiveSearch;


// to use >>>>>
// const url = `${baseUrl}category?page=1&sort=name&keyword=searchValue&fields=name,image`;
// <LiveSearch id="search" label="filter books" url={url} keyword="searchValue" />