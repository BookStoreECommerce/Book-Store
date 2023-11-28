import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../Redux/Slicies/filterSlice";
import { booksFilter } from "../../Redux/Slicies/filterActions";
import { setBooksPageNumber } from "../../Redux/Slicies/bookSlice";

export default function Sort() {
  const { sort, filter } = useSelector((state) => state.booksFilter);
  const { pageNumber } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleChange = ({target}) => {
    dispatch(setSort(target.value));
    dispatch(setBooksPageNumber(1));
    dispatch(booksFilter({pageNumber, filter}));
  };

 useEffect(() => {
    dispatch(booksFilter({pageNumber, filter}));
  }, [pageNumber, dispatch]);

  return (
    <Box sx={{ minWidth: 250 }}>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value="price">Price - Low to High</MenuItem>
          <MenuItem value="-price">Price - High to Low</MenuItem>
          <MenuItem value="-sold">Best Seller</MenuItem>
          <MenuItem value="-published">New Arrivals</MenuItem>
          <MenuItem value="-rating">Most Rated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
