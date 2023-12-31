import React, { forwardRef, useEffect, useState } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import { booksFilter } from "../../../Redux/Slicies/filterActions";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import AuthorFilter from "../AuthorFilter/AuthorFilter";
import PublicationDateFilter from "../PublicationDateFilter/PublicationDateFilter";
import FormatFilter from "../FormatFilter/FormatFilter";
import RateFilter from "../RateFilter/RateFilter";
import StockFilter from "../StockFilter/StockFilter";
import { clearFilterObj, setFilter } from "../../../Redux/Slicies/filterSlice";
import { setBooksPageNumber } from "../../../Redux/Slicies/bookSlice";
import CloseIcon from "@mui/icons-material/Close";
import { AppBar, Button, Dialog, DialogActions, DialogContent, IconButton, Slide, Toolbar, Typography, useMediaQuery } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FilterPanel = () => {
  const dispatch = useDispatch();
  const { pageNumber } = useSelector((state) => state.books);
  const { language, price, category, author, published, format, rate, stock } = useSelector(
    (state) => state.booksFilter.filterObj
  );
  const { filter } = useSelector(
    (state) => state.booksFilter
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

  const clearFilter = () => {
    dispatch(clearFilterObj());
    dispatch(setBooksPageNumber(1));
    dispatch(booksFilter({ pageNumber, filter }));
  }

  const isSmallScreen = useMediaQuery("(max-width: 991px)");

  useEffect(() => {
    let languagesFilter = "",
      pricesFilter = "",
      categoriesFilter = "",
      authorsFilter = "",
      publicationFilter = "",
      formatFilter = "",
      rateFilter = "",
      stockFilter = "";

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
        formatFilter = `&format=${ele}`;
      });
    }
    // rate
    if (rate.length !== 0) {
      rate.forEach((ele) => {
        rateFilter = `&rate=${ele}`;
      });
    }
    // stock
    if (stock.length !== 0) {
      stockFilter = `&stock=true`;
    }


    let filter = `${languagesFilter}${pricesFilter}${categoriesFilter}${authorsFilter}${publicationFilter}${formatFilter}${rateFilter}${stockFilter}`;
    dispatch(setFilter(filter));
    dispatch(setBooksPageNumber(1));
    dispatch(booksFilter({ pageNumber, filter }));
  }, [language, price, category, author, published, format, rate, stock, dispatch]);

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
            <RateFilter/>
            <FormatFilter/>
            <StockFilter/>
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
              <RateFilter/>
              <FormatFilter/>
              <StockFilter/>
            </DialogContent>

            <DialogActions>
              <Button onClick={clearFilter}>Clear</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
