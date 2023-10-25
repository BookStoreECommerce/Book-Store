
import React, { useEffect } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import { booksFilter } from "../../../Redux/Slicies/filterActions";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import AuthorFilter from "../AuthorFilter/AuthorFilter";

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
      let priceArray = [];
      price.forEach((ele) => {
        let element = ele.split(',');
        priceArray.push(element);
      })
      priceArray = priceArray.flat(1);
      let min = Math.min( ...priceArray );
      let max = Math.max( ...priceArray );
      pricesFilter += `&price[gte]=${min}&price[lte]=${max}`;
    }
    // category
    if(category.length !== 0) {
      category.forEach((ele, index) => {
        let element = ele.replace(/[&]/gi, (match) => '.');
        element = element.replace(/[,]/gi, (match) => '@');
        console.log(element);
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

    dispatch(booksFilter(`${languagesFilter}${pricesFilter}${categoriesFilter}${authorsFilter}`));
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
        </div>
      </nav>
    </>
  );
};

export default FilterPanel;
