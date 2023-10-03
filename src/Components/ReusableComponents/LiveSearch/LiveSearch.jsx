import { Autocomplete, TextField, Box, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../../axios/axios-instance";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import classes from "./LiveSearch.module.css";

const LiveSearch = ({ label, url, keyword, onSubmit: exportSearchValue }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const InputValueToFormikHandler = (event, value) => {
    formik.values.search = value?.name;
  };
  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: (values) => values.search && exportSearchValue(values.search),
  });
  const handleInputChange = useCallback(
    async (val) => {
      setOptions([]);
      const { data } = await axiosInstance(
        url.replace(`=${keyword}`, `=${val}`)
      );
      data.result.length && setOptions(data.result);
    },
    [keyword, url]
  );

  useEffect(() => {
    handleInputChange("");
  }, []);

  return (
    <div
      className="position-absolute"
      style={{
        zIndex: "9999",
        left: "50%",
        transform: "translateX(-50%)",
        width: "500px",
      }}
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <Autocomplete
          id="live-search"
          onChange={InputValueToFormikHandler}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          isOptionEqualToValue={(option, value) => option?.name === value.name}
          getOptionLabel={(option) => option?.name}
          options={options}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="30"
                src={option?.image?.secure_url}
                alt=""
              />
              {option?.name}
            </Box>
          )}
          loading={loading}
          renderInput={(params) => (
            <TextField
              // id="search"
              name="search"
              onChange={(e) => handleInputChange(e.target.value)}
              {...params}
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <button type="submit" className={classes["search-btn"]}>
                    <SearchIcon />
                  </button>
                ),
              }}
            />
          )}
        />
      </form>
    </div>
  );
};

export default LiveSearch;

// to use >>>>>


// const searchBooks = (searchKeyword) => {
//   console.log(searchKeyword);
// }
// const url = `${baseUrl}category?page=1&sort=name&keyword=searchValue&fields=name,image`;
// const url = `${baseUrl}book/?keyword=searchValue&page=1&sort=createdAt,-price&price[gt]=30&price[lt]=500&fields=name,bookName`;

// <LiveSearch id="search" label="search categories" url={url} keyword="searchValue" onSubmit={searchBooks} />
