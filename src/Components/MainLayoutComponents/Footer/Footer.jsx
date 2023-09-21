import React, { Fragment } from "react";
import style from './Footer.module.css'
import { Box } from "@mui/material";

const Footer = ({footerRef, customCss}) => {
    return (

        <>
        <Box width={'100%'} className={customCss ? customCss : style.marginTop} ref={footerRef}>
        <div className="darkBg">
        <div className="container">
            <div className="row justify-content-center align-items-center text-white text-center">
                <div className="col-12 py-3">
                    <span className={style.footer}>Copyright 2023 <span className="fw-bold">Sphinx</span>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </div>

    </div>
        </Box>

        </>
    );
}

export default Footer;