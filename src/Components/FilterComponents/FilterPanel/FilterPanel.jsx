
import React, { useEffect } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import { booksFilter } from "../../../Redux/Slicies/filterActions";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import AuthorFilter from "../AuthorFilter/AuthorFilter";
import PublicationDateFilter from "../PublicationDateFilter/PublicationDateFilter";

const FilterPanel = () => {
  const dispatch = useDispatch();
  
  const { language, price, category, author, publication } = useSelector((state) => state.booksFilter.filterObj);
  
  useEffect(() => {
    let languagesFilter = '', pricesFilter = '', categoriesFilter = '', authorsFilter = '', publicationFilter = '';
    // language
    if(language.length !== 0) {
      language.forEach((ele) => {
        languagesFilter += `&lang=${ele}`
      })
    }
    // price
    if(price.length !== 0) {
      price.forEach((ele) => {
       pricesFilter += `&price=${ele}`;
      })
    }
    // category
    if(category.length !== 0) {
      category.forEach((ele, index) => {
        let element = ele.replace(/[&]/gi, (match) => '.');
        element = element.replace(/[,]/gi, (match) => '@');
        if(index === 0) {
          categoriesFilter += `&category=${element}` 
        } else {
          categoriesFilter += `,${element}` 
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
    // publication
    if(publication.length !== 0) {
      publication.forEach((ele) => {
        publicationFilter += `&published=${ele}`;
      })
    }
    let filter = `${languagesFilter}${pricesFilter}${categoriesFilter}${authorsFilter}${publicationFilter}`;
    dispatch(booksFilter(filter));
  }, [language, price, category, author, publication, dispatch])

  return (
    <>
      <nav className={`sidebar d-flex flex-column h-100`}>
        <h3>
          <div className={`${styles.sidebarHeader} fw-bold`}>Filter By</div>
        </h3>
        <div>
            <CategoriesFilter/>
            <LanguageFilter/>
            <PriceFilter/>
            <AuthorFilter/>
            <PublicationDateFilter/>
        </div>
      </nav>
    </>
  );
};

export default FilterPanel;
