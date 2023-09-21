import React, { useEffect, useState } from "react";
import styles from "./Timer.module.css";

function Timer({ setDisabled, clicked, setClicked }) {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

    if (counter === 0) setDisabled(false);

    if (clicked) {
      setCounter(5);
      setClicked(false);
      setDisabled(true);
    }

    return () => clearInterval(timer);
  }, [setDisabled, counter, clicked]);

  return (
    <>
      <h6
        className={`h6 alert alert-info text-center d-flex justify-content-center align-items-center mb-0 ${styles.timerBg}`}
      >
        00:{counter < 10 ? 0 : ""}
        {counter}
      </h6>
      <div className="d-grid">
        {/* <button className="btn btn-dark" onClick={onReset}>
          Reset
        </button> */}
      </div>
    </>
  );
}
export default Timer;
