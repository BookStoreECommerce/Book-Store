import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { handleFilterCheck, setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const LanguageFilter = () => {
  const dispatch = useDispatch();
  const { filterCheckBtns } = useSelector((state) => state.booksFilter);

  const handleChange = (e) => {
    let method;
    dispatch(handleFilterCheck(e.target.value));
    if (e.target.checked === true) method = 'add'
    else method = 'delete'
        
    dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
  };

  let values = ["English", "Arabic"];

  return (
    <div>
      <h6>Language</h6>
      <FormGroup className="wFitContent">
        {values.map((ele, index) => <FormControlLabel key={index} control={<Checkbox name="language" checked={filterCheckBtns[values[index]] || false} value={values[index]} onChange={handleChange}/>} label={values[index]} />)}
      </FormGroup>
      <hr />
    </div>
  )
}

export default LanguageFilter
