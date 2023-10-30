import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch } from 'react-redux';

const PublicationDateFilter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
      let method;
      if (e.target.checked === true) method = 'add'
      else method = 'delete'

      dispatch(setFilterObj({method, name: e.target.name, value: e.target.value, display: `Published Year: ${e.target.value}`}));
    };

  return (
    <>
      <h6>Publication Date</h6>

    <FormGroup>
      <FormControlLabel control={<Checkbox name="published" value="0-2000" onChange={handleChange}/>} label="Before 2000" />
      <FormControlLabel control={<Checkbox name="published" value="2000-2010" onChange={handleChange}/>} label="2000 - 2010" />
      <FormControlLabel control={<Checkbox name="published" value="2010-2020" onChange={handleChange}/>} label="2010 - 2020" />
      <FormControlLabel control={<Checkbox name="published" value="2020-2023" onChange={handleChange}/>} label="After 2020" />
    </FormGroup>
    </>
  )
}

export default PublicationDateFilter
