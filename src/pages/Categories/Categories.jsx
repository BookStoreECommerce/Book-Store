import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from "../../Redux/Slicies/CategoriesAction.js";
import CategoryCard from "../../Components/HomeComponents/CategoryCard/CategoryCard.jsx";
import { baseUrl } from "../../util/util.js";
import LiveSearch from "../../Components/ReusableComponents/LiveSearch/LiveSearch.jsx";

const Categories = () => {
    const { categories } = useSelector((state) => state.cat)

    let catArray = categories.result;
    console.log(catArray);


    const dispach = useDispatch();

    // async function getAllCat(){
    //   let x =  await dispach(getCategories());
    //   console.log(x.payload.result);
    // }


    useEffect(() => {
        dispach(getCategories());
    }, [])

    // {catArray?.map((cat) => (
    //     <p className="pt-5">{cat}</p>
    // ))}
    const searchBooks = (searchKeyword) => {
        console.log(searchKeyword);
    }
    const url = `${baseUrl}category?page=1&sort=name&keyword=searchValue&fields=name,image`;
    return (
        <>
            <div className="container mb-3" style={{ "marginTop": "150px" }}>
            <div className="py-4">
    <LiveSearch minCharToSearch="2" label="search categories" url={url} keyword="searchValue" onSubmit={searchBooks} />
            
            </div>
                <div className="row gy-4">
                    {catArray?.map((cat) => (
                        <CategoryCard sectionName="" catName={cat.name} img={cat.image.secure_url} />
                    ))}
                </div>

            </div>


        </>

    );
}

export default Categories;