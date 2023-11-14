import React, { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Rating } from '@mui/material';
import styles from './ReviewDialog.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleReviewClose } from '../../../Redux/Slicies/dialogSlice';
import starIcon from '../../../assets/starIcon.png'
import { useState } from 'react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const ReviewDialog = () => {
    const [value, setValue] = useState(null);

  const dispatch = useDispatch();
  const { reviewOpen } = useSelector((state) => state.dialog)
  console.log(reviewOpen);

  const handleClose = () => {
      // setOpen(false);
      dispatch(handleReviewClose());
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
      if (reviewOpen) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
              descriptionElement.focus();
          }
      }
  }, [reviewOpen]);

  return ( 
      <div data-testid='ReviewDialog'>
   
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={reviewOpen}
        maxWidth="sm"
        fullWidth
        disableScrollLock
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className={styles.header}>
          <img src={starIcon} alt="" className={styles.imgWidth}/>
          <h5 className={styles.title}>Your opinion matters to us!</h5>
          <p className={styles.reviewParg}>what is you rate?</p>
          <Rating name="simple-controlled" value={value}
          className={styles.sizeStar}
          onChange={(event, newValue) => {
          setValue(newValue);
        }}/>
    
        </DialogTitle>
        <IconButton
        data-testid='closeIcon'
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers className={styles.modalBody}>
    
        <p className={`${styles.reviewParg} `}>Please share your opinion about the product</p>
        <textarea class="form-control" placeholder="please write your review ........" id="floatingTextarea" rows={6} cols={6}></textarea>

  
  

        </DialogContent>
        <DialogActions className={styles.btn}>
          <Button data-testid='review' className={`${styles.sendBtn} px-4`}>
            SEND REVIEW
          </Button>
          <Button data-testid='review' className={`${styles.thanksBtn} px-4 mt-2 mb-4`} onClick={handleClose}>
            No Thanks!
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
 
export default ReviewDialog;