import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFooterMargin, setFooterMargin } from "../../Redux/Slicies/appSlice";

const Favourites = () => {
  const dispatch = useDispatch();
  const { footerH, navH } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(removeFooterMargin());
    return () => dispatch(setFooterMargin())
  }, [])

  return <>
  <Box
    sx={{
      // marginTop: `${navH}px`,
      minHeight: `calc(100vh - ${footerH + navH}px)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
    <div>Favourites</div>
    </Box>
    </>
}

export default Favourites;