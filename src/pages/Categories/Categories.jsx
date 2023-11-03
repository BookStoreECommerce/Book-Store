import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from "../../Redux/Slicies/CategoriesAction.js";
import CategoryCard from "../../Components/HomeComponents/CategoryCard/CategoryCard.jsx";
import { baseUrl } from "../../util/util.js";
import LiveSearch from "../../Components/ReusableComponents/LiveSearch/LiveSearch.jsx";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Loading from '../../Components/ReusableComponents/Loading/Loading'
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice.js";
import Box from "@mui/material/Box";
import styles from './Categories.module.css'
import ScrollToTop from "../../Components/ReusableComponents/ScrollToTop/ScrollToTop.jsx";

const Categories = () => {
    const { categories } = useSelector((state) => state.cat);
    const { isLoading } = useSelector((state) => state.cat);
    const { footerH, navH } = useSelector((state) => state.app);

    const [page, setPageState]=useState(1);
    const [search, setSearch]=useState("");

   
    let catArray = categories.result;
    let totalCategoriesCount = categories.totalCount;
    let totalPages = Math.ceil((totalCategoriesCount / 12));

   

    const dispatch = useDispatch();

 ;

    useEffect(() => {
        dispatch(getCategories({searchTerm:search}));
        dispatch(removeFooterMargin());
        return () => dispatch(setFooterMargin());
    }, [dispatch])
    // Pagination
    const setPage = (e, p) => {
      
        setPageState(p)
        dispatch(getCategories({page:p}));
    }
    // Search
    const searchBooks = (searchKeyword) => {
        // searchKeyword = searchKeyword.replace(/\*|\[|\]|\(|\)|\\|#/g, '')
        // searchKeyword = searchKeyword.replace(/\[|\] () */g, '')
        setSearch(searchKeyword)
        dispatch(getCategories({page,searchTerm:searchKeyword}));
        setPageState(1)
       

    }

    const url = `${baseUrl}category?page=1&sort=name&keyword=searchValue`;
    return (
        <>
        <ScrollToTop/>
        <Box className={styles.Box}
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}
      >
        <div className="container mb-3 " >
            <div className="py-4">
                <LiveSearch minCharToSearch="2" label="search categories" url={url} keyword="searchValue" onSubmit={searchBooks} hasImage="true" navParam='categories' />

            </div>
            {isLoading ? <Loading/> :<>
            <div className="row gy-4">
                {catArray?.map((cat,idx) => (
                    <CategoryCard sectionName="" key={idx} catName={cat.name} img={cat.image.secure_url} slug={cat.slug} />
                ))}
            </div>
                    {
                        totalCategoriesCount > 12 ? 
                        <div className="d-flex flex-column justify-content-center align-items-center my-5">
                        <Stack spacing={2}>
                            <Pagination count={totalPages} page={page} color="primary" shape="rounded" variant="outlined" onChange={setPage} />
                        </Stack>
                    </div>
                    :
                    ''
                    }
           </>}

        </div>
</Box>
        </>
    
       

    );
}

export default Categories;