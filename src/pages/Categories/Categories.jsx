import React from "react";
import { useSelector } from 'react-redux';

const Categories = () => {
    const {categories } = useSelector((state) => state.cat)
   
   
    return (
        <>
  <div className="container " style={{"marginTop":"150px"}}>
  {categories?.map((cat) => (
    <p className="pt-5">{cat}</p>
 ))}
  </div>
              
      
        </>

    );
}

export default Categories;