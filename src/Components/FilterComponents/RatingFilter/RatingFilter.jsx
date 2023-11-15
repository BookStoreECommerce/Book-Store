import React from 'react';
import { Rating } from '@mui/material';
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch } from 'react-redux';

const RatingFilter = () => {
  let ratingArray = [5, 4, 3, 2, 1];
  const dispatch = useDispatch();

  
  const handleChange = (e) => {
    dispatch(setFilterObj({method: "add", name: e.target.getAttribute("name"), value: e.target.getAttribute("value")}));
  }

  return (
    <div>
      <h6>Rating</h6>
      <div className='d-flex flex-column gap-1 wFitContent' onClick={handleChange}>
        {ratingArray.map((ele) => 
          <div key={ele} name="rating" value={ele} className='d-flex gap-1 cursorPointer'>
            <Rating name="rating" value={ele} readOnly />{ele === 5 ? "only" : "& up"}
          </div>
        )}
      </div>
      <hr />
    </div>
  )
}

export default RatingFilter
