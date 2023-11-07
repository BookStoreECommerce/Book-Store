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
import { Box } from '@mui/material';
import styles from './PolicyDialog.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { handlePrivacyClose } from '../../../Redux/Slicies/dialogSlice';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const PolicyDialog = () => {


  const dispatch = useDispatch();
  const { privacyOpen } = useSelector((state) => state.dialog)

  const handleClose = () => {
      // setOpen(false);
      dispatch(handlePrivacyClose());
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
      if (privacyOpen) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
              descriptionElement.focus();
          }
      }
  }, [privacyOpen]);

  return ( 
      <div data-testid='PolicyDialog'>
   
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={privacyOpen}
        maxWidth="md"
        fullWidth
        disableScrollLock
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className={styles.header}>
          Policy
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
        <Box >
        <Typography variant="h4">1. Terms of Service</Typography>
        <Typography variant="span"  >
    
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ultrices lobortis. Aenean vestibulum nunc non metus aliquam fringilla. Integer a condimentum mauris. Morbi quis nisl a nisi cursus consectetur. Integer leo ante, gravida ac enim a, ornare ornare metus. Duis porta mauris nec ex condimentum rhoncus. Aliquam laoreet augue enim, id cursus eros pulvinar at. Ut arcu leo, rutrum ac lectus nec, semper consectetur leo. Morbi eget arcu id libero mollis vulputate. Proin scelerisque scelerisque lorem vitae eleifend. Integer et vestibulum elit. Morbi quam massa, mollis in libero ac, pretium ultricies libero. Aliquam tempus mollis massa eget cursus. Suspendisse ultrices nunc interdum nulla porttitor faucibus. Donec ac diam pretium, aliquam urna nec, imperdiet quam. Proin imperdiet ipsum dictum dolor venenatis vulputate.
    
            Ut pellentesque tellus sem, sit amet hendrerit velit pharetra id. Praesent gravida, nisi id suscipit tincidunt, enim purus interdum nunc, eleifend ultrices ante leo eu magna. Nulla nisl ex, rutrum nec est nec, tincidunt finibus quam. Quisque in ante nunc. Quisque convallis sem eros, at cursus neque ultrices nec. Cras at maximus ipsum, finibus elementum ligula. In a commodo arcu, vitae pellentesque magna. Mauris rutrum, eros non tempor consequat, sem tellus dignissim purus, id pulvinar orci purus a mauris. Nam elit ex, ultricies at odio rutrum, gravida gravida sapien. Aenean tortor nisi, facilisis vitae blandit quis, tristique a purus. Mauris facilisis metus eget posuere placerat. Maecenas nec magna at tellus condimentum tincidunt. Nam quis enim dignissim, interdum metus mattis, efficitur quam. Nulla suscipit ac est vitae convallis.
        </Typography>
        </Box>
        <br/>
        
    <Box>
        <Typography variant="h4">2. Privacy policy</Typography>
        <Typography variant="span" >
        
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ultrices lobortis. Aenean vestibulum nunc non metus aliquam fringilla. Integer a condimentum mauris. Morbi quis nisl a nisi cursus consectetur. Integer leo ante, gravida ac enim a, ornare ornare metus. Duis porta mauris nec ex condimentum rhoncus. Aliquam laoreet augue enim, id cursus eros pulvinar at. Ut arcu leo, rutrum ac lectus nec, semper consectetur leo. Morbi eget arcu id libero mollis vulputate. Proin scelerisque scelerisque lorem vitae eleifend. Integer et vestibulum elit. Morbi quam massa, mollis in libero ac, pretium ultricies libero. Aliquam tempus mollis massa eget cursus. Suspendisse ultrices nunc interdum nulla porttitor faucibus. Donec ac diam pretium, aliquam urna nec, imperdiet quam. Proin imperdiet ipsum dictum dolor venenatis vulputate.
    
    Ut pellentesque tellus sem, sit amet hendrerit velit pharetra id. Praesent gravida, nisi id suscipit tincidunt, enim purus interdum nunc, eleifend ultrices ante leo eu magna. Nulla nisl ex, rutrum nec est nec, tincidunt finibus quam. Quisque in ante nunc. Quisque convallis sem eros, at cursus neque ultrices nec. Cras at maximus ipsum, finibus elementum ligula. In a commodo arcu, vitae pellentesque magna. Mauris rutrum, eros non tempor consequat, sem tellus dignissim purus, id pulvinar orci purus a mauris. Nam elit ex, ultricies at odio rutrum, gravida gravida sapien. Aenean tortor nisi, facilisis vitae blandit quis, tristique a purus. Mauris facilisis metus eget posuere placerat. Maecenas nec magna at tellus condimentum tincidunt. Nam quis enim dignissim, interdum metus mattis, efficitur quam. Nulla suscipit ac est vitae convallis.
        </Typography>
    </Box>
    <br/>
    <Box>
        <Typography variant="h4">3. Returns and exchanges policy</Typography>
        <Typography variant="span" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ultrices lobortis. Aenean vestibulum nunc non metus aliquam fringilla. Integer a condimentum mauris. Morbi quis nisl a nisi cursus consectetur. Integer leo ante, gravida ac enim a, ornare ornare metus. Duis porta mauris nec ex condimentum rhoncus. Aliquam laoreet augue enim, id cursus eros pulvinar at. Ut arcu leo, rutrum ac lectus nec, semper consectetur leo. Morbi eget arcu id libero mollis vulputate. Proin scelerisque scelerisque lorem vitae eleifend. Integer et vestibulum elit. Morbi quam massa, mollis in libero ac, pretium ultricies libero. Aliquam tempus mollis massa eget cursus. Suspendisse ultrices nunc interdum nulla porttitor faucibus. Donec ac diam pretium, aliquam urna nec, imperdiet quam. Proin imperdiet ipsum dictum dolor venenatis vulputate.
        </Typography>
    </Box>
    <br/>
    <Box>
        <Typography variant="h4">4. Shipping policy</Typography>
        <Typography variant="span" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ultrices lobortis. Aenean vestibulum nunc non metus aliquam fringilla. Integer a condimentum mauris. Morbi quis nisl a nisi cursus consectetur. Integer leo ante, gravida ac enim a, ornare ornare metus. Duis porta mauris nec ex condimentum rhoncus. Aliquam laoreet augue enim, id cursus eros pulvinar at. Ut arcu leo, rutrum ac lectus nec, semper consectetur leo. Morbi eget arcu id libero mollis vulputate. Proin scelerisque scelerisque lorem vitae eleifend. Integer et vestibulum elit. Morbi quam massa, mollis in libero ac, pretium ultricies libero. Aliquam tempus mollis massa eget cursus. Suspendisse ultrices nunc interdum nulla porttitor faucibus. Donec ac diam pretium, aliquam urna nec, imperdiet quam. Proin imperdiet ipsum dictum dolor venenatis vulputate.
    
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ultrices lobortis. Aenean vestibulum nunc non metus aliquam fringilla. Integer a condimentum mauris. Morbi quis nisl a nisi cursus consectetur. Integer leo ante, gravida ac enim a, ornare ornare metus. Duis porta mauris nec ex condimentum rhoncus. Aliquam laoreet augue enim, id cursus eros pulvinar at. Ut arcu leo, rutrum ac lectus nec, semper consectetur leo. Morbi eget arcu id libero mollis vulputate. Proin scelerisque scelerisque lorem vitae eleifend. Integer et vestibulum elit. Morbi quam massa, mollis in libero ac, pretium ultricies libero. Aliquam tempus mollis massa eget cursus. Suspendisse ultrices nunc interdum nulla porttitor faucibus. Donec ac diam pretium, aliquam urna nec, imperdiet quam. Proin imperdiet ipsum dictum dolor venenatis vulputate.
        </Typography>
    </Box>
    <br/>
    <Box>
        <Typography variant="h4">5. Taxes</Typography>
        <Typography variant="span" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ultrices lobortis. Aenean vestibulum nunc non metus aliquam fringilla. Integer a condimentum mauris. Morbi quis nisl a nisi cursus consectetur. Integer leo ante, gravida ac enim a, ornare ornare metus. Duis porta mauris nec ex condimentum rhoncus. Aliquam laoreet augue enim, id cursus eros pulvinar at. Ut arcu leo, rutrum ac lectus nec, semper consectetur leo. Morbi eget arcu id libero mollis vulputate. Proin scelerisque scelerisque lorem vitae eleifend. Integer et vestibulum elit. Morbi quam massa, mollis in libero ac, pretium ultricies libero. Aliquam tempus mollis massa eget cursus. Suspendisse ultrices nunc interdum nulla porttitor faucibus. Donec ac diam pretium, aliquam urna nec, imperdiet quam. Proin imperdiet ipsum dictum dolor venenatis vulputate.
        </Typography>
    </Box>
    <br/>
        </DialogContent>
        <DialogActions>
          <Button data-testid='return' className="mainBtn" onClick={handleClose}>
            Return
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
 
export default PolicyDialog;