import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Register } from '../Register/Register';
import Login from '../Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { handleClose } from '../../Redux/Slicies/dialogSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  export default function CustomizedDialogs() {
    const dispatch = useDispatch()
    const {open, status} = useSelector(state => state.dialog);

    return (
      <div>
        <BootstrapDialog
          onClose={()=> dispatch(handleClose())}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <IconButton
            aria-label="close"
            onClick={()=> dispatch(handleClose())}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            {status === 'register'?<Register/> : (status === 'login'?<Login/>:'')}
          </DialogContent>
        </BootstrapDialog>
      </div>
    );
  }