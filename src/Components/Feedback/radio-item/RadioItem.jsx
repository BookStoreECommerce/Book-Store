import { Box, FormControlLabel, Radio } from "@mui/material";
import Styles from "./RadioItem.module.css";
const RadioItem = ({ value, lable }) => {
  return (
    <>
      <Box
        component={"div"}
        // className={Styles.radio_container}
        sx={{
          borderRadius: "15px",
          border: "1px solid #ce7777",
          padding: "3px 15px",
          width: "100%",
          backgroundColor: "#F4F2F2",
          my: '5px'
        }}
      >
        <FormControlLabel
          value={value}
          control={<Radio />}
          label={lable}
          componentsProps={{
            typography: {
              fontFamily: "inherit",
              ml: 3,
              color: "#ce7777",
              fontSize: "1.5rem",
            },
          }}
        />
      </Box>
    </>
  );
};

export default RadioItem;
