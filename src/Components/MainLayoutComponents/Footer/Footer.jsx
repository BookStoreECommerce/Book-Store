import React, { Fragment } from "react";
import style from './Footer.module.css'

const Footer = ({footerRef, customCss}) => {
    return (

        <>
        <section className={customCss ? customCss : style.marginTop} ref={footerRef}>
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
        </section>

        </>
    );
}

export default Footer;