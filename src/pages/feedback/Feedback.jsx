import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFooterMargin,
  setFooterMargin,
} from "../../Redux/Slicies/appSlice";
import { Box } from "@mui/material";
import styles from "./Feedback.module.css";
import { Link } from "react-router-dom";
import RatingQuestion from "../../Components/Feedback/rating-question/RatingQuestion";

const questions = [
  {
    q: "How satisfied were you with the speed of shipping?",
    type: "rate",
  },
];

const Feedback = () => {
  const { footerH, navH } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          marginTop: `${navH}px`,
          minHeight: `calc(100vh - ${footerH + navH}px)`,
        }}
      >
        <div className={styles.badge}>
          <span className={styles.slug}>Feedback</span>
          <div className={styles.content}>
            <Link to="/">
              {" "}
              <i className="fa-solid fa-home"></i>{" "}
            </Link>
            <span className={styles.slash}>
              {" "}
              / <Link to="/whishlist">wishlist</Link>
            </span>
          </div>
        </div>

        <Box
          sx={{
            flexFlow: "column",
          }}
        >
            {questions.map(question => (
                <RatingQuestion question={question.q}/>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default Feedback;
