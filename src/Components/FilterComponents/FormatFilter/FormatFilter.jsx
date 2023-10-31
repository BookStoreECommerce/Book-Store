import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch } from 'react-redux';

const FormatFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let method;
    if (e.target.checked === true) method = 'add'
    else method = 'delete'

    dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
  };

  return (
    <div>
      <h6>Format</h6>
      <FormGroup>
        <FormControlLabel control={<Checkbox name="format" value="e-book" onChange={handleChange}/>} label="e-book" />
        <FormControlLabel control={<Checkbox name="format" value="hardcover" onChange={handleChange}/>} label="Hardcover" />
        <FormControlLabel control={<Checkbox name="format" value="paperback" onChange={handleChange}/>} label="Paperback" />
        <FormControlLabel control={<Checkbox name="format" value="audiobook" onChange={handleChange}/>} label="Audiobook" />
      </FormGroup>
    </div>
  )
}

export default FormatFilter
