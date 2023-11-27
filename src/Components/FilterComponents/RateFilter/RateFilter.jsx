import React from 'react';
import { Rating } from '@mui/material';
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch } from 'react-redux';

const RateFilter = () => {
  let rateArray = [5, 4, 3, 2, 1];
  const dispatch = useDispatch();

  
  const handleChange = (e) => {
    dispatch(setFilterObj({method: "add", name: e.target.getAttribute("name"), value: e.target.getAttribute("value")}));
  }

  return (
    <div>
      <h6>Customer Review</h6>
      <div className='d-flex flex-column gap-1 wFitContent' onClick={handleChange}>
        {rateArray.map((ele) => 
          <div key={ele} name="rate" value={ele} className='d-flex gap-1 cursorPointer'>
            <Rating name="rate" value={ele} readOnly />{ele === 5 ? "only" : "& up"}
          </div>
        )}
      </div>
      <hr />
    </div>
  )
}

export default RateFilter
