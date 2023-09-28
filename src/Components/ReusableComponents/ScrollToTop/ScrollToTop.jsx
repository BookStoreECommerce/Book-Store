import React,{useState, useEffect} from "react";
import styles from './ScrollToTop.module.css'
import { BiChevronUp } from "react-icons/bi";

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div className={styles.topToBtm} data-testid='ScrollToTop'>
            <div className={styles.iconPosition}>
            {" "}{showTopBtn && ( <BiChevronUp className={styles.iconStyle} onClick={goToTop} /> )}{" "}
            </div>
        </div>
    );
};
export default ScrollToTop;