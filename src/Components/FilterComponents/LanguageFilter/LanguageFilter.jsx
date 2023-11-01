import React from 'react';
import styles from "./LanguageFilter.module.css";
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
      dispatch(handleFilterCheck({checkName: e.target.value, check: !filterCheckBtns[e.target.value]}));
      if (e.target.checked === true) method = 'add'
      else method = 'delete'
          
      dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
    };

  return (
    <div>
      <h6>Language</h6>
      <FormGroup className={`${styles.wFitContent}`}>
        <FormControlLabel control={<Checkbox name="language" checked={filterCheckBtns.English} value="English" onChange={handleChange}/>} label="English" />
        <FormControlLabel control={<Checkbox name="language" checked={filterCheckBtns.Arabic} value="Arabic" onChange={handleChange}/>} label="Arabic" />
      </FormGroup>
      <hr />
    </div>
  )
}

export default LanguageFilter
