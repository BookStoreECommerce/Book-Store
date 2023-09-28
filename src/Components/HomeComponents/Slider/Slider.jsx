import React from "react";
import styles from './Slider.module.css'
import slide1 from '../../../assets/slide1.jpg';
import bg1 from '../../../assets/bg1.jpg';
import bg2 from '../../../assets/bg2.png';
import bg3 from '../../../assets/bg3.jpg';
import bg4 from '../../../assets/bg4.jpg';
import slide2 from '../../../assets/slide2.jpg';
import slide3 from '../../../assets/slide3.jpg';
import slide4 from '../../../assets/slide4.jpg';
import SliderScrollBtn from "../../../Components/ReusableComponents/SliderScrollBtn/SliderScrollBtn";


const Slider = () => {
    return (
        <>
            <div id="carouselExampleInterval" className="carousel slide mb-5" data-bs-ride="carousel" data-testid='Slider'>
                <div className="carousel-inner">
                    <div className={`carousel-item active`}>
                        <div className={styles.carusouelContent}>
                            <h1 className={styles.headerContent}>Buy <span className={styles.colorHeader}>your</span><br /> favourite <span className={styles.colorHeader}>Book</span> <br />from <span className={styles.colorHeader}>Here</span></h1>
                            <button className={`${styles.shopBtn} btn px-lg-4 py-lg-2`}>Shop Now <i className="fa-solid fa-arrow-right ms-2 fw-bold"></i></button>
                        </div>
                        <img src={slide1} className={`${styles.landscapeBg} w-100`} alt="..." />
                        <img src={bg1} className={`${styles.portritBg} w-100 `} alt="..." />
                    </div>
                    <div className={`carousel-item`}>
                        <div className={styles.carusouelContent}>
                            <h1 className={styles.headerContent}>A book is a <span className={styles.colorHeader}> Dream</span><br />
                                that you <span className={styles.colorHeader}> Hold</span>
                                <br />
                                in your <span className={styles.colorHeader}> Hands</span>
                            </h1>
                            <button className={`${styles.shopBtn} btn px-lg-4 py-lg-2`}>Shop Now <i className="fa-solid fa-arrow-right ms-2 fw-bold"></i></button>
                        </div>
                        <img src={slide2} className={`${styles.landscapeBg} w-100`} alt="..." />
                        <img src={bg2} className={`${styles.portritBg} w-100`} alt="..." />
                    </div>
                    <div className={`carousel-item`}>
                        <div className={styles.carusouelContent}>
                            <h1 className={styles.headerContent}>There is <span className={styles.colorHeader}>no</span><br /> friend as <span className={styles.colorHeader}>Loyal</span> <br />as a <span className={styles.colorHeader}>Book</span></h1>
                            <button className={`${styles.shopBtn} btn px-lg-4 py-lg-2`}>Shop Now <i className="fa-solid fa-arrow-right ms-2 fw-bold"></i></button>
                        </div>
                        <img src={slide3} className={`${styles.landscapeBg} w-100`} alt="..." />
                        <img src={bg3} className={`${styles.portritBg} w-100 `} alt="..." />
                    </div>
                    <div className={`carousel-item`}>
                        <div className={styles.carusouelContent}>
                            <h1 className={styles.headerContent}>Today a <span className={styles.colorHeader}>reader</span><br /> tomorrow a <span className={styles.colorHeader}>Leader</span> </h1>
                            <button className={`${styles.shopBtn} btn px-lg-4 py-lg-2`}>Shop Now <i className="fa-solid fa-arrow-right ms-2 fw-bold"></i></button>
                        </div>
                        <img src={slide4} className={`${styles.landscapeBg} w-100  `} alt="..." />
                        <img src={bg4} className={`${styles.portritBg} w-100 `} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <SliderScrollBtn />
            </div>
        </>
    );
}

export default Slider;