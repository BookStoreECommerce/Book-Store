import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFooterMargin,
  setFooterMargin,
} from "../../Redux/Slicies/appSlice";
import { Box, Typography } from "@mui/material";
import styles from "./Feedback.module.css";
import { Link, useParams } from "react-router-dom";
import RatingQuestion from "../../Components/Feedback/rating-question/RatingQuestion";
import axios from "axios";
import { baseUrl } from "../../util/util.js";
import Loading from "../../Components/ReusableComponents/Loading/Loading.jsx";

const Feedback = () => {
  const { footerH, navH } = useSelector((state) => state.app);
  const { token } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin());
  }, [dispatch]);
  const checkUser = useMemo(async () => {
    const result = await axios
      .get(`${baseUrl}feedback/checkuser`, {
        headers: {
          authorization: token,
        },
      })
      .then(({ data }) => data)
      .catch(({ response }) => {
        setError(response?.data?.error);
        return response?.data;
      });
    setLoading(false);
  }, []);
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
            flexFlow: "row",
          }}
        >
          {loading ? (
            <Loading />
          ) : error ? (
            <Typography
              variant="h3"
              sx={{
                fontFamily: "inherit",
                m: 10,
                color: "red",
              }}
            >
              {error}
              &nbsp;&nbsp;
              <Link to="/book">Order Now</Link>
            </Typography>
          ) : (
            <RatingQuestion />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Feedback;
