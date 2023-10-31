
import React, { useEffect } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import { booksFilter } from "../../../Redux/Slicies/filterActions";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import AuthorFilter from "../AuthorFilter/AuthorFilter";
import PublicationDateFilter from "../PublicationDateFilter/PublicationDateFilter";
import FormatFilter from "../FormatFilter/FormatFilter";

const FilterPanel = () => {
  const dispatch = useDispatch();
  
  const { language, price, category, author, published, format } = useSelector((state) => state.booksFilter.filterObj);
  
  useEffect(() => {
    let languagesFilter = '', pricesFilter = '', categoriesFilter = '', authorsFilter = '', publicationFilter = '', formatFilter = '';
    // language
    if(language.length !== 0) {
      language.forEach((ele, index) => {
        if(index === 0) {
          languagesFilter += `&lang=${ele}`
        } else {
          languagesFilter += `,${ele}` 
        }
      })
    }
    // price
    if(price.length !== 0) {
      price.forEach((ele) => {
       pricesFilter = `&price=${ele}`;
      })
    }
    // category
    if(category.length !== 0) {
      category.forEach((ele, index) => {
        if(index === 0) {
          categoriesFilter += `&category=${ele.slug}` 
        } else {
          categoriesFilter += `,${ele.slug}` 
        }
      })
    }
    // author
    if(author.length !== 0) {
      author.forEach((ele, index) => {
        if(index === 0) {
          authorsFilter += `&author=${ele}` 
        } else {
          authorsFilter += `,${ele}` 
        }
      })
    }
    // published
    if(published.length !== 0) {
      published.forEach((ele) => {
        publicationFilter += `&published=${ele}`;
      })
    }
    // format
    if(format.length !== 0) {
      format.forEach((ele) => {
        formatFilter += `&format=${ele}`;
      })
    }

    let filter = `${languagesFilter}${pricesFilter}${categoriesFilter}${authorsFilter}${publicationFilter}${formatFilter}`;
    dispatch(booksFilter(filter));
  }, [language, price, category, author, published, format, dispatch])

  return (
    <>
      <nav className={`sidebar d-flex flex-column h-100 gap-3`}>
        <h3>
          <div className={`${styles.sidebarHeader} fw-bold`}>Filter By</div>
        </h3>
        <div className="d-flex flex-column gap-4">
            <CategoriesFilter/>
            <LanguageFilter/>
            <PriceFilter/>
            <AuthorFilter/>
            <PublicationDateFilter/>
            {/* <FormatFilter/> */}
        </div>
      </nav>
    </>
  );
};

export default FilterPanel;
