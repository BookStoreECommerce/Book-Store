import React from "react";
import styles from './Slider.module.css'
import slide1 from '../../../../assets/slide1.jpg';
import bg1 from '../../../../assets/bg1.jpg';
import bg2 from '../../../../assets/bg2.png';
import bg3 from '../../../../assets/bg3.jpg';
import bg4 from '../../../../assets/bg4.jpg';
import slide2 from '../../../../assets/slide2.jpg';
import slide3 from '../../../../assets/slide3.jpg';
import slide4 from '../../../../assets/slide4.jpg';
import SliderScrollBtn from "../../../ReusableComponents/SliderScrollBtn/Slider ScrollBtn";


const Slider = () => {
    return (
        <>
            <div id="carouselExampleSlidesOnly" className="carousel slide mb-5" data-bs-ride="carousel" >
                <div className="carousel-inner">
                    <div className={`carousel-item active ${styles.sliderImgOne}`}>
                        <div className={styles.carusouelContent}>
                            <h1 className={styles.headerContent}>Buy <span className={styles.colorHeader}>your</span><br /> favourite <span className={styles.colorHeader}>Book</span> <br />from <span className={styles.colorHeader}>Here</span></h1>
                            <button className={`btn px-lg-4 py-lg-2 ${styles.shopBtn}`}>Shop Now <i className="fa-solid fa-arrow-right ms-2 fw-bold"></i></button>
                        </div>
                        <img src={slide1} className={`d-block w-100 ${styles.landscapeBg} ${styles.imgFlip}`} alt="..." />
                        <img src={bg1} className={`d-none w-100 ${styles.portritBg}`} alt="..." />
                    </div>
                    <div className={`carousel-item ${styles.sliderImgTwo}`}>
                        <div className={styles.carusouelContent}>
                            <h1 className={styles.headerContent}>A book is a <span className={styles.colorHeader}> Dream</span><br />
                                that you <span className={styles.colorHeader}> Hold</span>
                                <br />
                                in your <span className={styles.colorHeader}> Hands</span>
                            </h1>
                            <button className={`btn px-lg-4 py-lg-2 ${styles.shopBtn}`}>Shop Now <i className="fa-solid fa-arrow-right ms-2 fw-bold"></i></button>
                        </div>
                        <img src={slide2} className={`d-block w-100 ${styles.landscapeBg} ${styles.imgFlip}`} alt="..." />
                        <img src={bg2} className={`d-none w-100 ${styles.portritBg}`} alt="..." />
                    </div>
                    <div className={`carousel-item  ${styles.sliderImgThree}`}>
                        <div className={styles.carusouelContent}>
                            <h1 className={styles.headerContent}>There is <span className={styles.colorHeader}>no</span><br /> friend as <span className={styles.colorHeader}>Loyal</span> <br />as a <span className={styles.colorHeader}>Book</span></h1>
                            <button className={`btn px-lg-4 py-lg-2 ${styles.shopBtn}`}>Shop Now <i className="fa-solid fa-arrow-right ms-2 fw-bold"></i></button>
                        </div>
                        <img src={slide3} className={`d-block w-100 ${styles.landscapeBg} ${styles.imgFlip}`} alt="..." />
                        <img src={bg3} className={`d-none w-100 ${styles.portritBg}`} alt="..." />
                    </div>
                    <div className={`carousel-item ${styles.sliderImgFour}`}>
                        <div className={styles.carusouelContent}>
                            <h1 className={styles.headerContent}>Today a <span className={styles.colorHeader}>reader</span><br /> tomorrow a <span className={styles.colorHeader}>Leader</span> </h1>
                            <button className={`btn px-lg-4 py-lg-2 ${styles.shopBtn}`}>Shop Now <i className="fa-solid fa-arrow-right ms-2 fw-bold"></i></button>
                        </div>
                        <img src={slide4} className={`d-block w-100 ${styles.landscapeBg} `} alt="..." />
                        <img src={bg4} className={`d-none w-100 ${styles.portritBg}`} alt="..." />
                    </div>
                </div>
                <SliderScrollBtn />
            </div>
        </>
    );
}

export default Slider;