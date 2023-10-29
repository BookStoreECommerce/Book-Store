// *******************************
// checkbox
// import React from 'react';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
// import { useDispatch } from 'react-redux';


// const PriceFilter = () => {
//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//       let method;
//       if (e.target.checked === true) method = 'add'
//       else method = 'delete'

//       dispatch(setFilterObj({method, name: e.target.name, value: e.target.value}));
//     };

//   return (
//     <>
//       <h6>Price</h6>

//     <FormGroup>
//       <FormControlLabel control={<Checkbox name="price" value="0-300" onChange={handleChange}/>} label="Less than 300EGP" />
//       <FormControlLabel control={<Checkbox name="price" value="300-400" onChange={handleChange}/>} label="300EGP - 400EGP" />
//       <FormControlLabel control={<Checkbox name="price" value="400-500" onChange={handleChange}/>} label="400EGP - 500EGP" />
//       <FormControlLabel control={<Checkbox name="price" value="500-600" onChange={handleChange}/>} label="500EGP - 600EGP" />
//       <FormControlLabel control={<Checkbox name="price" value="600-700" onChange={handleChange}/>} label="600EGP - 700EGP" />
//       <FormControlLabel control={<Checkbox name="price" value="700-10000" onChange={handleChange}/>} label="More than 700EGP" />
//     </FormGroup>
//     </>
//   )
// }
// export default PriceFilter


// *******************************
// slider
// import React, { useState } from 'react';
// import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
// import { useDispatch } from 'react-redux';
// import Slider from '@mui/material/Slider';
// import Box from '@mui/material/Box';

// function valuetext(value) {
//   return `${value}`;
// }


// const PriceFilter = () => {
//     const dispatch = useDispatch();

//     const [value, setValue] = useState([150, 1000]);

//     const handleChange = (event, newValue) => {
//       setValue(newValue);
      
//       setTimeout(() => {        
//         dispatch(setFilterObj({method: 'add', name: 'price', value: newValue}));
//       }, 3000);
//     };

//   return (
//     <>
//       <h6>Price</h6>
//       <Box sx={{ width: 300 }}>
//       <Slider
//         getAriaLabel={() => 'price'}
//         getAriaValueText={valuetext}
//         valueLabelDisplay="auto"
//         step={100}
//         marks
//         min={100}
//         max={5000}
//         onChange={handleChange}
//         value={value}
//         />
//     </Box>
//     </>
//   )
// }
// export default PriceFilter


// *******************************
// inputs
import React, { forwardRef, useEffect, useState } from 'react';
import styles from "./PriceFilter.module.css";
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix="EGP "
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PriceFilter = () => {
  const dispatch = useDispatch();
  // const { isLoading  } = useSelector((state) => state.booksFilter);

  const go = (e) => {
    let value = `${values.min}-${values.max}`
    dispatch(setFilterObj({method:'add', name: e.target.name, value}));
  };

  const [values, setValues] = useState({min: '250', max:'1000'});
  const [isfirst, setIsFirst] = useState(true);

  const handleChange = (event) => {
    setIsFirst(false);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  
  return (
    <>
      <h6>Price</h6>
      <TextField
        label="from"
        value={values.min}
        onChange={handleChange}
        name="min"
        id="min"
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
        variant="standard"
      />
      <TextField
        label="to"
        value={values.max}
        onChange={handleChange}
        name="max"
        id="max"
        InputProps={{
          inputComponent: NumericFormatCustom,
        }}
        variant="standard"
      />

      <Button
        variant="outlined"
        sx={{
          padding: "5px 15px !important",
        }}
        onClick={(e) => go(e)}
        name='price'
        // endIcon={
        //   isLoading && (
        //     <i className="fas fa-spinner fa-spin"></i>
        //   )
        // }
        className={`mainBtn align-self-end my-3 ${styles.wFitContent}`}
        disabled={isfirst === true ? true : false}
      >
        Go
      </Button>
    </>
  )
}
export default PriceFilter

