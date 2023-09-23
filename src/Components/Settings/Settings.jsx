import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFooterMargin, setFooterMargin } from '../../Redux/Slicies/appSlice';
import { Box } from '@mui/material';

const Settings = () => {
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
    <div>Settings</div>
    </Box>
    </>
}

export default Settings;
