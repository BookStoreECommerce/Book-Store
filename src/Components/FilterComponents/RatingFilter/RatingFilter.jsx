import React from 'react';
import { Rating } from '@mui/material';
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch } from 'react-redux';

const RatingFilter = () => {
  let ratingArray = [5, 4, 3, 2, 1];
  const dispatch = useDispatch();

  const handleChange = (e) => {
    // let method;
    // if (e.target.checked === true) method = 'add'
    // else method = 'delete'
        
    dispatch(setFilterObj({method: "add", name: e.target.name, value: e.target.value}));
    // dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
  }

  return (
    <div>
      <h6>Rating</h6>
      <div className='d-flex flex-column gap-1' onClick={handleChange}>
        {ratingArray.map((ele) => 
          <div key={ele} name="rating" value={ele} className='d-flex gap-1 cursorPointer'>
            <Rating name="rating" value={ele} readOnly /> <span>{ele === 5 ? "only" : "& up"}</span>
          </div>
        )}
      </div>
      <hr />
    </div>
  )
}

export default RatingFilter
