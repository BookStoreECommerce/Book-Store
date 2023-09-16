import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { handleClose } from '../../Redux/Slicies/dialogSlice';
import { resetError } from '../../Redux/Slicies/authSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  export default function CustomizedDialogs({children, show}) {
    const dispatch = useDispatch()
    const handleClose1  =()=>{
      dispatch(handleClose())
      dispatch(resetError());
    }

    return (  
      <div>
        <BootstrapDialog
          onClose={ handleClose1}
          aria-labelledby="customized-dialog-title"
          open={show}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose1 }
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
            {children}
          </DialogContent>
        </BootstrapDialog>
      </div>
    );
  }