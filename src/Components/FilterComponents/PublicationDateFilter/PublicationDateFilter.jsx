import React from 'react';
import styles from "./PublicationDateFilter.module.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { handleFilterCheck, setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

const PublicationDateFilter = () => {
  const dispatch = useDispatch();
  const { filterCheckBtns } = useSelector((state) => state.booksFilter);

  const handleChange = (e) => {
    let method;
    dispatch(handleFilterCheck(e.target.value));
    if (e.target.checked === true) method = 'add'
    else method = 'delete'
        
    dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
  };

  let date = new Date();
  let thisYear = date.getFullYear();

  let values = ["0-2000", "2000-2010", "2010-2020", `2020-${thisYear}`];

  return (
    <div>
      <h6>Publication Date</h6>
      <FormGroup className={`${styles.wFitContent}`}>
        <FormControlLabel control={<Checkbox name="published" checked={filterCheckBtns[values[0]] || false} value={values[0]} onChange={handleChange}/>} label="Before 2000" />
        <FormControlLabel control={<Checkbox name="published" checked={filterCheckBtns[values[1]] || false} value={values[1]} onChange={handleChange}/>} label="2000 - 2010" />
        <FormControlLabel control={<Checkbox name="published" checked={filterCheckBtns[values[2]] || false} value={values[2]} onChange={handleChange}/>} label="2010 - 2020" />
        <FormControlLabel control={<Checkbox name="published" checked={filterCheckBtns[values[3]] || false} value={values[3]} onChange={handleChange}/>} label="After 2020" />
      </FormGroup>
      {/* <hr /> */}
    </div>
  )
}

export default PublicationDateFilter
