import React, {useEffect} from "react";
import styles from './AboutUs.module.css'
import AOS from "aos";
import "aos/dist/aos.css";
const AboutUs = () => {
    useEffect(() => {
        AOS.init();
        window.addEventListener('load', AOS.refresh);
    }, []);
    return (
        <>
            <section className={` ${styles.bg} darkBg `} data-testid='AboutUs'>
                <div className={styles.bgOverLay}>
                    <div className="container pb-5 text-center">
                        <div className="row">
                            <div className="header">
                                <h2 className={`${styles.AboutHeader} mt-5 text-center text-white`}>About Us</h2>
                            </div>
                            <div className="col-12" data-aos="zoom-in">
                                <p className={`${styles.parg}`}>Since its inception, SAYEGH is committed to the advancement of culture and education, through the provision of quality educational content, assessment and professional development to serve learners, educators and future generations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutUs;