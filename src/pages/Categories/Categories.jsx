import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from "../../Redux/Slicies/CategoriesAction.js";

const Categories = () => {
    const { categories } = useSelector((state) => state.cat)
    
    let catArray = categories.result;
    console.log(catArray);
   

    const dispach = useDispatch();

    // async function getAllCat(){
    //   let x =  await dispach(getCategories());
    //   console.log(x.payload.result);
    // }


    useEffect(()=>{
        dispach(getCategories());
    },[])

    // {catArray?.map((cat) => (
    //     <p className="pt-5">{cat}</p>
    // ))}
   
    return (
        <>
            <div className="container " style={{ "marginTop": "150px" }}>
            {catArray?.map((cat) => (
                    <p className="pt-5">{cat.name}</p>
                ))}
                <button onClick={() => dispach(getCategories())}>X</button>
            </div>


        </>

    );
}

export default Categories;