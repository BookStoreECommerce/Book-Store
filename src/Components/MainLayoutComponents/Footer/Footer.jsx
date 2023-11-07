import React, { Fragment } from "react";
import style from './Footer.module.css'
import { useSelector } from "react-redux";

const Footer = ({ footerRef }) => {
    const {footerMargin} = useSelector((state) => state.app);
    return (

        <>
            <section data-testid="footer" className={ footerMargin ? style.marginTop : style.removeMargT} ref={footerRef}>
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