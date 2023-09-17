import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";
import styles from './SocialMedia.module.css'
import { baseUrl } from "../../../util/util";

const SocialMediaBtns = () => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <Button
          variant="outlined"
          startIcon={<GoogleIcon className={styles.googleIconColor}/>}
          className={styles.socialMediaBtns}href={baseUrl + "auth/google"}
          // target="_blank"
        >
          signup with google
        </Button>

        <Button
          variant="outlined"
          startIcon={<i className={`fa-brands fa-facebook-f ${styles.fbIconColor}`}></i>}
          className={styles.socialMediaBtns}
          href={baseUrl + "auth/facebook"}
          // target="_blank"
        >
          signup with facebook
        </Button>
      </div>
    </>
  );
};

export default SocialMediaBtns;
