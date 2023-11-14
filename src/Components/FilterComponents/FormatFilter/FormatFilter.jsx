import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { handleFilterRadio, setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, Radio, RadioGroup } from '@mui/material';

const FormatFilter = () => {
  const dispatch = useDispatch();
  const { filterRadioBtns } = useSelector((state) => state.booksFilter);


  const handleChange = (e) => {
    let method;
    dispatch(handleFilterRadio(e.target.value));
    if (e.target.checked === true) method = 'add'
    else method = 'delete'

    dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
  };

  let values = ["e-book", "hardcover", "pdf"];

  return (
    <div>
      <h6>Format</h6>
      <FormControl>
        <RadioGroup
          name="radio-buttons-group"
        >
          {values.map((ele, index) => <FormControlLabel key={index} control={<Radio name="format" checked={filterRadioBtns[values[index]] || false} value={values[index]} onChange={handleChange}/>} label={values[index]} />)}
        </RadioGroup>
      </FormControl>
      <hr />
    </div>
  )
}

export default FormatFilter
