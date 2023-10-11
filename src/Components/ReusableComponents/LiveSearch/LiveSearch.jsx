import { Autocomplete, TextField, Box, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../../axios/axios-instance";
import { useCallback, useState } from "react";
import classes from "./LiveSearch.module.css";

const LiveSearch = ({
  label,
  url,
  keyword,
  minCharToSearch,
  onSubmit,
  hasImage = "false",
  pageNumber
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e, val = searchValue) => {
    e.preventDefault();
    // searchValue.length > 0 &&

    onSubmit(val);
  };

  const handleInputChange = useCallback(
    async (val) => {
      setSearchValue(val);

      if (val.length >= +minCharToSearch) {
        setLoading(true);
        pageNumber(1)
      } else {
        setOpen(false);
        return;
      }
      // setOptions([]);
      try {
        const { data } = await axiosInstance(
          url.replace(`=${keyword}`, `=${val}`)
        );
        data.result.length && setOptions(data.result);
      } catch (error) {
        // console.log(error);
      }
      setLoading(false);
    },
    [keyword, url, minCharToSearch]
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Autocomplete
        onInputChange={(e, val) => handleInputChange(val)}
        clearOnBlur={false}
        open={open}
        onOpen={(e) => setOpen(e.target?.value?.length >= +minCharToSearch)}
        onClose={(event, reason) => {
          if (reason === "selectOption") {
            setTimeout(() => {
              console.log(event.target.defaultValue || event.target.innerText);
              onSubmit(event.target.defaultValue || event.target.innerText);
            }, 1);
          }
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option?.name === value.name}
        getOptionLabel={(option) => option?.name}
        options={options}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option._id}
          >
            {hasImage.toLowerCase() === "true" && (
              <img
                loading="lazy"
                width="30"
                src={option?.image?.secure_url}
                alt=""
              />
            )}
            {option?.name}
          </Box>
        )}
        loading={loading}
        renderInput={(params) => (
          <TextField
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
  );
};

export default LiveSearch;

// to use >>>>>

// const searchBooks = (searchKeyword) => {
//   console.log(searchKeyword);
// }
// const url = `${baseUrl}category?page=1&sort=name&keyword=searchValue&fields=name,image`;
// <LiveSearch minCharToSearch="2" label="search categories" url={url} keyword="searchValue" onSubmit={searchBooks} />
