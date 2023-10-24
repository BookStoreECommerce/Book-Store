
import React, { useEffect, useState } from "react";
import styles from "./FilterPanel.module.css";
import { useDispatch } from "react-redux";
import AllCategoriesSearch from "../AllCategoriesSearch/AllCategoriesSearch";
import LanguageFilter from "../LanguageFilter/LanguageFilter";
import { booksFilter } from "../../Redux/Slicies/filterActions";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const [filterObj, setFilterObj] = useState({lang: [], price: []});

  useEffect(() => {
        let languagesFilter = '';
        if(filterObj.lang.length !== 0) {
          filterObj.lang.forEach((ele, index) => {
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
            <LanguageFilter filterObj={filterObj} setFilterObj={setFilterObj}/>
        </div>
      </nav>
    </>
  );
};

export default FilterPanel;
