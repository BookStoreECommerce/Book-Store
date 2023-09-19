import { CircularProgress, Typography } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signinWithToken } from "../../Redux/Slicies/authSlice";

const Success = () => {
  const { token } = useParams();

  const { isLoading, token: serverToekn } = useSelector(state => state.auth);
  console.log(serverToekn);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      dispatch(signinWithToken(token));
    }
    if (serverToekn !== null) {
      navigate('/');
    }
  }, [dispatch, isFirst, token, navigate]);


  return (
    <>
      {
        isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <Typography variant="h3" sx={{
            color: (theme) => theme.palette.primary.dark
          }} > Logged in successfully</Typography >
        )}
    </>
  );
};

export default memo(Success);
