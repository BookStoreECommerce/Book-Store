import { FormControl, RadioGroup } from "@mui/material";
import RadioItem from "../radio-item/RadioItem";
import Styles from "./Radios.module.css";

const Radios = ({ options, handleChange, name }) => {
  return (
    <>
      {/* <RadioItem /> */}
      <FormControl
        sx={(theme) => ({
          [theme.breakpoints.up("sm")]: {
            width: "600px",
          },
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
          mb: 3,
        })}
        // className={Styles.radios}
      >
        {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name={name}
          //   value={value}
          onChange={handleChange}
        >
          {/* <FormControlLabel value="female" control={<Radio />} label="Female" /> */}
          {options.map((option, index) => (
            <RadioItem key={index} value={option.value} lable={option.lable} />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Radios;
