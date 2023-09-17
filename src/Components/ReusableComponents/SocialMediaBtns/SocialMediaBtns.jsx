import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Box, Button } from "@mui/material";
import styles from './SocialMedia.module.css'
import { baseUrl } from "../../../util/util";

const SocialMediaBtns = () => {
  return (
    <>
      <Box 
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
      >
        <Button
          variant="outlined"
          startIcon={<GoogleIcon sx={{color: "#DE1414"}}/>}
          className={styles.socialMediaBtns}
          href={baseUrl + "auth/google"}
        >
          signup with google
        </Button>

        <Button
          variant="outlined"
          startIcon={<i className={`fa-brands fa-facebook-f ${styles.fbIconColor}`}></i>}
          className={styles.socialMediaBtns}
          href={baseUrl + "auth/facebook"}
        >
          signup with facebook
        </Button>
      </Box>
    </>
  );
};

export default SocialMediaBtns;
