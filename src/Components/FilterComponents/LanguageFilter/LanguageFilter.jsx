import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch } from 'react-redux';

const LanguageFilter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
      let method;
      if (e.target.checked === true) method = 'add'
      else method = 'delete'
          
      dispatch(setFilterObj({method, name: e.target.name, value: e.target.value, display: `Language: ${e.target.value}`}));
    };

  return (
    <>
    <FormGroup>
      <h6>Language</h6>
      <FormControlLabel control={<Checkbox name="language" value="English" onChange={handleChange}/>} label="English" />
      <FormControlLabel control={<Checkbox name="language" value="Arabic" onChange={handleChange}/>} label="Arabic" />
    </FormGroup>
    </>
  )
}

export default LanguageFilter
