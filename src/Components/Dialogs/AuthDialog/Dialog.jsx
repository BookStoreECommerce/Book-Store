import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../../Redux/Slicies/dialogSlice";
import { clearError } from "../../../Redux/Slicies/authSlice";
import { DialogTitle } from "@mui/material";
import Login from "../../AuthComponents/Login/Login";
import Register from "../../AuthComponents/Register/Register";
import RegisterVerify from "../../AuthComponents/RegisterVerify/RegisterVerify";
import CartDialog from "../CartDialog/CartDialog.jsx";

const formsList = [
  { name: "login", title: "LOGIN", form: <Login /> },
  { name: "register", title: "CREATE YOUR ACCOUNT", form: <Register /> },
  { name: "add-to-cart", title: "CHOOSE YOUR FAVORITE TYPE", form: <CartDialog /> },
  {
    name: "register-verify",
    title: "ACCOUNT VERIFICATION",
    form: <RegisterVerify />,
  },
];

const getForm = (name) => {
  const form = formsList.filter((form) => form.name === name);
  return { ...form[0] };
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const dispatch = useDispatch();
  const { open, name } = useSelector((state) => state.dialog);
  const { title, form } = getForm(name);
  const closeHandle = () => {
    dispatch(handleClose());
    dispatch(clearError());
  };

  return (
    <div>
      <BootstrapDialog
        onClose={() => closeHandle()}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
        disableScrollLock={true}
      >
        <IconButton
          aria-label="close"
          onClick={() => closeHandle()}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          variant="h4"
          sx={{
            fontSize: "calc(1.275rem + 0.3vw)",
            textAlign: "center",
            color: (theme) => theme.palette.primary.main,
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2 }}>
          {form}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
