import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from "../../Redux/Slicies/CategoriesAction.js";
import CategoryCard from "../../Components/HomeComponents/CategoryCard/CategoryCard.jsx";
import { baseUrl } from "../../util/util.js";
import LiveSearch from "../../Components/ReusableComponents/LiveSearch/LiveSearch.jsx";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Categories = () => {
    const { categories } = useSelector((state) => state.cat)

    let catArray = categories.result;
    let totalCategoriesCount=categories.totalCount;
    let totalPages = Math.ceil((totalCategoriesCount / 12));

    console.log(totalPages);

    console.log(totalCategoriesCount);
    console.log(catArray);


    const dispach = useDispatch();



    useEffect(() => {
        dispach(getCategories(1));
    }, [dispach])

    const setPage =(e,p)=>{
console.log(p);
dispach(getCategories(p));
    }

    const searchBooks = (searchKeyword) => {
        console.log(searchKeyword);
    }
    const url = `${baseUrl}category?page=1&sort=name&keyword=searchValue&fields=name,image`;
    return (
        <>
            <div className="container mb-3 " style={{ "marginTop": "150px" }}>
            <div className="py-4">
            <LiveSearch minCharToSearch="2" label="search categories" url={url} keyword="searchValue" onSubmit={searchBooks} />
            
            </div>
            <div className="row gy-4">
            {catArray?.map((cat) => (
                <CategoryCard sectionName="" catName={cat.name} img={cat.image.secure_url} />
                ))}
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                    <Stack spacing={2}>
                        <Pagination count={totalPages} shape="rounded" onChange={setPage} />
                    </Stack>
                </div>

            </div>


        </>

    );
}

export default Categories;