import { Container, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../util/util";
import { useDispatch, useSelector } from "react-redux";
import { signinWithToken } from "../../Redux/Slicies/authSlice";

const Success = () => {
  const { token } = useParams();

  const {error, isLoading, token: serverToekn } = useSelector(state => state.auth);
console.log(serverToekn);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isFirst, setIsFirst] = useState(true);
  
  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      dispatch(signinWithToken(token));
    }
    if(serverToekn != null){
        navigate('/');
    }
  }, [dispatch, isFirst, token, serverToekn, navigate]);



  return (
    <Container maxWidth="xl">
      {isLoading ? (
        <Typography variant="h3">loading...</Typography>
      ) : (
        <Typography variant="h3">done</Typography>
      )}
    </Container>
  );
};

export default Success;
