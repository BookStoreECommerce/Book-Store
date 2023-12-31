import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Rating, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleReviewClose } from '../../../Redux/Slicies/dialogSlice';
import starIcon from '../../../assets/starIcon.png'
import styles from './ReviewDialog.module.css';
import { addReview,updateReview } from '../../../Redux/Slicies/reviewAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const ReviewDialog = ({ id ,review}) => {
// console.log(id);
    const { user } = useSelector((state) => state.auth);
    const { reviewOpen } = useSelector((state) => state.dialog)
    const dispatch = useDispatch();
    var userName = user?.userName
    let userReview = review?.filter((ele)=>ele?.user?.userName === userName)[0]
    const [value, setValue] = useState(userReview?.rating?userReview?.rating:null);
    const [message, setMessage] = useState(userReview?.content?userReview?.content:'');

    const handleMessageChange = event => {
        setMessage(event.target.value);
    };


    const handleClose = () => {
        dispatch(handleReviewClose());
    };

    const handleSend = async () => {
        handleClose()
// console.log("send");
    if(userReview?.content){
        await dispatch(updateReview({ id: userReview._id , content: message, rating: value}))
   
            toast.info("Review updated!", {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                closeButton: false
            });
        
  
    }else{
        await dispatch(addReview({ content: message, rating: value, book: id }))
        console.log(message,value);
        
        if(message != "" && value != null){
            toast.success("Review added!", {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                closeButton: false
            });
        }else if (message != "" && value == null){
            toast.error("Please add rate!", {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                closeButton: false
            });
        }else if(message == "" && value != null){
            toast.error("Please add your opinion!", {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                closeButton: false
            });
        }else{
            toast.error("Please add your opinion!", {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                closeButton: false
            });
        }
   
    }
    }
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
       <>
        
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
                    <img src={starIcon} alt="" className={styles.imgWidth} />
                    <Typography className={styles.title}>Your opinion matters to us!</Typography>
                    <p className={styles.reviewParg}>what is you rate?</p>
                    <Rating name="simple-controlled" value={value}
                        className={styles.sizeStar}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }} />

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
                    <textarea className="form-control" placeholder="please write your review ........" id="floatingTextarea" rows={6} cols={6} value={message} onChange={handleMessageChange}></textarea>
                </DialogContent>
                <DialogActions className={styles.btn}>
                <ToastContainer position="bottom-left"
                                                autoClose={2000}
                                                hideProgressBar={false}
                                                newestOnTop={false}
                                                closeOnClick={false}
                                                rtl={false}
                                                pauseOnFocusLoss
                                                closeButton={false}
                                                draggable
                                                pauseOnHover={false}
                                                theme="light" />
                    <Button data-testid='review' className={`${styles.sendBtn} px-4`} onClick={handleSend}>
                        SEND REVIEW
                    </Button>

                    <Button data-testid='review' className={`${styles.thanksBtn} px-4 mt-2 mb-4`} onClick={handleClose}>
                        No Thanks!
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
       </>
    );
}

export default ReviewDialog;