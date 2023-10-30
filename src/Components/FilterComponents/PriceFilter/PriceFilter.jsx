import React, { forwardRef, useState } from 'react';
import styles from "./PriceFilter.module.css";
import { setFilterObj } from '../../../Redux/Slicies/filterSlice';
import { useDispatch } from 'react-redux';
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

  const go = (e) => {
    let value = `${values.min}-${values.max}`
    dispatch(setFilterObj({method:'add', name: e.target.name, value}));
  };

  const [values, setValues] = useState({min: '250', max:'1000'});

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  
  return (
    <div className="filterSections">
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
        className={`mainBtn align-self-end my-3 ${styles.wFitContent}`}
      >
        Go
      </Button>
    </div>
  )
}
export default PriceFilter

