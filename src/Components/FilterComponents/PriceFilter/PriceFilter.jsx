import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch } from 'react-redux';
// import Slider from '@mui/material/Slider';
// import Box from '@mui/material/Box';

// function valuetext(value) {
//   return `${value}`;
// }


const PriceFilter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
      let method;
      if (e.target.checked === true) method = 'add'
      else method = 'delete'

      dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
    };

    // const [value, setValue] = useState([150, 1000]);

    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
      
    //   setTimeout(() => {        
    //     dispatch(setFilterObj({method: 'add', name: 'price', value: newValue}));
    //   }, 3000);
    // };

  return (
    <>
      <h6>Price</h6>
      {/* <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'price'}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={100}
        marks
        min={100}
        max={5000}
        onChange={handleChange}
        value={value}
        />
    </Box> */}

    <FormGroup>
      <FormControlLabel control={<Checkbox name="price" value="0-300" onChange={handleChange}/>} label="Less than 300EGP" />
      <FormControlLabel control={<Checkbox name="price" value="300-400" onChange={handleChange}/>} label="300EGP - 400EGP" />
      <FormControlLabel control={<Checkbox name="price" value="400-500" onChange={handleChange}/>} label="400EGP - 500EGP" />
      <FormControlLabel control={<Checkbox name="price" value="500-600" onChange={handleChange}/>} label="500EGP - 600EGP" />
      <FormControlLabel control={<Checkbox name="price" value="600-700" onChange={handleChange}/>} label="600EGP - 700EGP" />
      <FormControlLabel control={<Checkbox name="price" value="700-10000" onChange={handleChange}/>} label="More than 700EGP" />
    </FormGroup>
    </>
  )
}

export default PriceFilter
