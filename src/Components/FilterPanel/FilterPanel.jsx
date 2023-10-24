
import React, { useEffect } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import AllCategoriesSearch from "../AllCategoriesSearch/AllCategoriesSearch";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import { booksFilter } from "../../Redux/Slicies/filterActions";

const FilterPanel = () => {
  const dispatch = useDispatch();

  const { filterObj } = useSelector((state) => state.booksFilter);

  useEffect(() => {
        let languagesFilter = '';
        if(filterObj.language.length !== 0) {
          filterObj.language.forEach((ele, index) => {
              languagesFilter += `&lang=${ele}`
            })
            dispatch(booksFilter(languagesFilter));
        }
    }, [filterObj, dispatch])

  return (
    <>
      <nav className={`sidebar d-flex flex-column h-100`}>
        <h3>
          <div className={`${styles.sidebarHeader} fw-bold`}>Filter By</div>
        </h3>
        <div>
            <AllCategoriesSearch/>
            <LanguageFilter/>
        </div>
      </nav>
    </>
  );
};

export default FilterPanel;
