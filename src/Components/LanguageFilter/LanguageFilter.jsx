import React, { useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { booksFilter } from '../../Redux/Slicies/filterActions';
import { useEffect } from 'react';

const LanguageFilter = () => {
    const dispatch = useDispatch();
    const [langArray, setLangArray] = useState([]);

    const handleChange = (e) => {
        if (e.target.checked === true) {
            setLangArray((prev)=> ([...prev, e.target.name]))
        } else {
            setLangArray(langArray.filter((ele) => ele !== e.target.name));
        }
    };

    useEffect(() => {
        let languagesFilter = '';
        if(langArray.length !== 0) {
            langArray.forEach((ele, index) => {
                if(index === 0) {
                    languagesFilter += `lang=${ele}`
                }
                else {
                    languagesFilter += `&lang=${ele}`
                }
            })
            dispatch(booksFilter(languagesFilter));
        }
    }, [langArray, dispatch])

  return (
    <>
    <FormGroup>
      <h6>Language</h6>
      <FormControlLabel control={<Checkbox name="English" onChange={handleChange}/>} label="English" />
      <FormControlLabel control={<Checkbox name="Arabic" onChange={handleChange}/>} label="Arabic" />
    </FormGroup>
    </>
  )
}

export default LanguageFilter
