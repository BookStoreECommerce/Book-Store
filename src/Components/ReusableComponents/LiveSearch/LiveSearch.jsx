// to use >>>>>

// <LiveSearch
//   url={url}                 // URL of the API
//   keyword="searchValue"     // The keyword value refers to the part of URL that should be replaced with the entered value
//   onSubmit={searchBooks}    // That callback function gets the entered searchValue ((const searchBooks = (searchKeyword) => {}))
//   navParam="RouteLocation"  // By choosing one of the dropdown items, it navigates to /RouteLocation/slug
//   label="search categories" // :OPTIONAL -> Default is "Search" -> Label that shows at the top of the searchbar
//   minCharToSearch="1"       // :OPTIONAL -> Default is 1        -> DropDown shows after that specific characters count
//   hasImage="true"           // :OPTIONAL -> Default is "false"  -> Set true if dropdown items have images
//   pageNumber={setPage}      // :OPTIONAL -> Reset your pagination, if you have such const [page, setPage] = useState(1);
// />;

import { Autocomplete, TextField, Box, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../../axios/axios-instance";
import { useCallback, useState } from "react";
import classes from "./LiveSearch.module.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setBooksPageNumber } from "../../../Redux/Slicies/bookSlice";
import { clearFilterObj } from "../../../Redux/Slicies/filterSlice";

const LiveSearch = ({
  navParam,
  label,
  url,
  keyword,
  minCharToSearch = 1,
  onSubmit,
  // pageNumber,
  hasImage = "false",
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pageNumber } = useSelector((state) => state.books);

  const handleSubmit = (e, val = searchValue) => {
    e.preventDefault();
    // if (val.length >= +minCharToSearch && pageNumber) pageNumber(1);
    // new
    if (val.length >= +minCharToSearch && pageNumber) {
      dispatch(clearFilterObj())
      dispatch(setBooksPageNumber(1));
    }
    onSubmit(val);
  };

  const handleInputChange = useCallback(
    async (val) => {
      setSearchValue(val);
      if (val === "") {
        // pageNumber && pageNumber(1);
        // new
        pageNumber && dispatch(setBooksPageNumber(1));
        onSubmit(val); //show all if removed search word
      }
      if (val.length >= +minCharToSearch) {
        setLoading(true);
      } else {
        setOpen(false);
        return;
      }
      setOptions([]);
      try {
        const { data } = await axiosInstance(
          url.replace(`=${keyword}`, `=${val}`)
        );
        data.result.length && setOptions(data.result);
      } catch (error) {
        // for future planning if other components asked me for error type!
      }
      setLoading(false);
    },
    [keyword, url, minCharToSearch, pageNumber]
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Autocomplete
        onInputChange={(_, val) => {
          handleInputChange(val);
        }}
        onChange={(_, val) => {
          if (val) {
            const slug = val?.slug;
            if (slug) {
              navigate(`/${navParam}/${slug}`);
            }
          }
        }}
        clearOnBlur={false}
        open={open}
        onOpen={(e) => setOpen(e.target?.value?.length >= +minCharToSearch)}
        onClose={(event, reason) => {
          if (reason === "selectOption") {
            setTimeout(() => {
              onSubmit(event.target.defaultValue || event.target.innerText);
            }, 1);
          }
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option?.name !== value.name}
        getOptionLabel={(option) => option?.name}
        options={options}
        filterOptions={(options, { inputValue }) => {
          const name = inputValue.replace(/[^\w\s\'\,\:\"\.\-]/gi, "");
          return options.filter((option) =>
            option.name.toLowerCase().includes(name)
          );
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option._id}
            slug={option.slug}
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
            placeholder={label ? label : "Search"}
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
