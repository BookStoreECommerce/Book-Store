import React, { forwardRef, useEffect, useState } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import { booksFilter } from "../../../Redux/Slicies/filterActions";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import AuthorFilter from "../AuthorFilter/AuthorFilter";
import PublicationDateFilter from "../PublicationDateFilter/PublicationDateFilter";
// import FormatFilter from "../FormatFilter/FormatFilter";
import { setFilter } from "../../../Redux/Slicies/filterSlice";
import { setBooksPageNumber } from "../../../Redux/Slicies/bookSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DialogActions, DialogContent, useMediaQuery } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { pageNumber } = useSelector((state) => state.books);
  const { language, price, category, author, published, format } = useSelector(
    (state) => state.booksFilter.filterObj
  );

  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");

  const handleClickOpen = (scrollType) => {
    setScroll(scrollType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isSmallScreen = useMediaQuery("(max-width: 991px)");

  useEffect(() => {
    let languagesFilter = "",
      pricesFilter = "",
      categoriesFilter = "",
      authorsFilter = "",
      publicationFilter = "",
      formatFilter = "";

    // language
    if (language.length !== 0) {
      language.forEach((ele, index) => {
        if (index === 0) {
          languagesFilter += `&lang=${ele}`;
        } else {
          languagesFilter += `,${ele}`;
        }
      });
    }
    // price
    if (price.length !== 0) {
      price.forEach((ele) => {
        pricesFilter = `&price=${ele}`;
      });
    }
    // category
    if (category.length !== 0) {
      category.forEach((ele, index) => {
        if (index === 0) {
          categoriesFilter += `&category=${ele.slug}`;
        } else {
          categoriesFilter += `,${ele.slug}`;
        }
      });
    }
    // author
    if (author.length !== 0) {
      author.forEach((ele, index) => {
        if (index === 0) {
          authorsFilter += `&author=${ele}`;
        } else {
          authorsFilter += `,${ele}`;
        }
      });
    }
    // published
    if (published.length !== 0) {
      published.forEach((ele) => {
        publicationFilter += `&published=${ele}`;
      });
    }
    // format
    if (format.length !== 0) {
      format.forEach((ele) => {
        formatFilter += `&format=${ele}`;
      });
    }

    let filter = `${languagesFilter}${pricesFilter}${categoriesFilter}${authorsFilter}${publicationFilter}${formatFilter}`;
    dispatch(setFilter(filter));
    dispatch(setBooksPageNumber(1));
    dispatch(booksFilter({ pageNumber, filter }));
  }, [language, price, category, author, published, format, dispatch]);

  return (
    <>
      {!isSmallScreen ? (
        <nav className={`sidebar d-flex flex-column h-100 gap-3`}>
          <h3>
            <div className={`${styles.sidebarHeader} fw-bold`}>Filter By</div>
          </h3>
          <div className="d-flex flex-column">
            <CategoriesFilter />
            <AuthorFilter />
            <PriceFilter />
            <LanguageFilter />
            <PublicationDateFilter />
            {/* <FormatFilter/> */}
          </div>
        </nav>
      ) : (
        <div>
          <Button variant="outlined" onClick={() => handleClickOpen("paper")}>
            Filter
          </Button>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Filter By
                </Typography>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <DialogContent dividers={scroll === "paper"}>
              <CategoriesFilter />
              <AuthorFilter />
              <PriceFilter />
              <LanguageFilter />
              <PublicationDateFilter />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Clear</Button>
              <Button onClick={handleClose}>Apply Filter</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
