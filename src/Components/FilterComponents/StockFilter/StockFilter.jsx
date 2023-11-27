import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { handleFilterCheck, setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const StockFilter = () => {
  const dispatch = useDispatch();
  const { filterCheckBtns, filterRadioBtns } = useSelector((state) => state.booksFilter);
  const [disabled, setDisabled] = useState(true)

  const handleChange = (e) => {
    let method;
    dispatch(handleFilterCheck(e.target.value));
    if (e.target.checked === true) method = 'add'
    else method = 'delete'
        
    dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
  };

  useEffect(() => {
    if (filterRadioBtns.hasOwnProperty("hardcover") && filterRadioBtns["hardcover"] === true){
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [filterRadioBtns])
  

  let values = ["stock"];

  return (
    <div>
      <h6>Availability in Stock</h6>
      <FormGroup className="wFitContent">
        {values.map((ele, index) => <FormControlLabel disabled={disabled} key={index} control={<Checkbox name="stock" checked={filterCheckBtns[values[index]] || false} value={values[index]} onChange={handleChange}/>} label="Hardcover Available" />)}
      </FormGroup>
      {/* <hr /> */}
    </div>
  )
}

export default StockFilter
