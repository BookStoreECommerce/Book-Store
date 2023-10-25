
import React, { useEffect } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import { booksFilter } from "../../../Redux/Slicies/filterActions";
import CategoriesFilter from "../CategoriesFilter/CategoriesFilter";

const FilterPanel = () => {
  const dispatch = useDispatch();

  const { language, price, category, author, publication } = useSelector((state) => state.booksFilter.filterObj);

  useEffect(() => {
        let languagesFilter = '', pricesFilter = '', categoriesFilter = '', authorsFilter = '', publicationFilter = '';
        if(language.length !== 0) {
          language.forEach((ele) => {
            languagesFilter += `&lang=${ele}`
          })
          dispatch(booksFilter(languagesFilter));
        }
        // else if(category.length !== 0) {
        //   category.forEach((ele) => {
        //       categoriesFilter += `&category[_id]=${ele}` 
        //     })
        //     dispatch(booksFilter(categoriesFilter));
        // }
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
        </div>
      </nav>
    </>
  );
};

export default FilterPanel;
