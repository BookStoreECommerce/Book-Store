import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import styles from './SocialMedia.module.css'
import { baseUrl } from "../../../util/util";

const SocialMediaBtns = () => {
  return (
    <>
      <div className="d-flex flex-column flex-sm-row gap-sm-0 gap-2 justify-content-between mt-1">
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
      </div>
    </>
  );
};

export default SocialMediaBtns;
