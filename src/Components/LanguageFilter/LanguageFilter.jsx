import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const LanguageFilter = ({filterObj, setFilterObj}) => {

    const handleChange = (e) => {
        if (e.target.checked === true) {
            setFilterObj((prev)=> ({...prev, lang: [prev.lang, e.target.name]}));
        } else {
            const lang = filterObj.lang.filter((ele) => ele !== e.target.name);
            setFilterObj((prev)=> ({...prev, lang: lang}));
        }
    };

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
