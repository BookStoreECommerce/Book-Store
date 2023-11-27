import React, { useEffect, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ToastContainer, toast } from "react-toastify";
import styles from './CartDialog.module.css'

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/Slicies/cartSlice.js";
import { addCartWithToken } from "../../../Redux/Slicies/cartAction.js";
import { handleClose } from "../../../Redux/Slicies/dialogSlice.js";

export default function CartDialog() {
  const { buyBook, isLoading } = useSelector(({ cart }) => cart);
  // const { token } = useSelector(({ auth }) => auth);
  const token = localStorage.getItem("access-token");
  const [type, setType] = useState(null);
  const [book, setBook] = useState({
    name: buyBook.name,
    variations: buyBook.variations,
  });

  const addAlert = () => {
    toast.success(
      `${book.name.split(" ").slice(0, 3).join(" ")} added to cart!`,
      {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        closeButton: false,
      }
    );
  };

  const labels = (str) =>
    str === "hardcover" ? (
      <MenuBookIcon sx={{ fontSize }} />
    ) : str === "pdf" ? (
      <PictureAsPdfIcon sx={{ fontSize }} />
    ) : str === "e-book" ? (
      <AutoStoriesIcon sx={{ fontSize }} />
    ) : str === "audio" ? (
      <AudioFileIcon sx={{ fontSize }} />
    ) : null;

  const dispatch = useDispatch();

  const fontSize = 44;

  const handleChange = (variation) => {
    setType(variation.variation_name);
    setBook((prev) => {
      return {
        ...prev,
        variation_name: variation.variation_name,
        variation_price: variation.variation_price,
      };
    });
  };

  const addToCartFN = async (e) => {
    if (!token) {
      await dispatch(addToCart(book));
      // toast.dismiss(buyBook._id);
      addAlert();
    } else {
      toast.loading(
        `Adding ${book.name.split(" ").slice(0, 3).join(" ")}.....`,
        {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          // progress: 0,
          theme: "colored",
          closeButton: false,
          toastId: buyBook._id,
        }
      );
      await dispatch(
        addCartWithToken({
          book: book._id,
          variation_name: book.variation_name,
        })
      );

      toast.dismiss(buyBook._id);
      dispatch(handleClose());
      addAlert();
    }
  };

  useEffect(() => {
    setBook(buyBook);
  }, []);
  return (
    <Box>
      <FormControl
        fullWidth
        sx={{ minHeight: "200px", justifyContent: "center" }}
        className={styles.contentPadding}
      >
        <Typography component="h2" className={styles.title} sx={{ textAlign: "center" }}>
          <Typography className={styles.buy} >BUY:</Typography> {book?.name?.split(" ").slice(0, 5).join(" ")} ......
        </Typography>
        <RadioGroup
          defaultValue="female"
          name="radio-buttons-group"

          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
          }}
        >
          {book?.variations?.map((el) => {
            return (
              <div key={el.variation_name}>
                   <div className="d-flex flex-column justify-content-center align-items-center">
                  <FormLabel className={styles.color}>{el.variation_name}</FormLabel>
                  <FormLabel className={styles.color2}>{el.variation_price} <span className={styles.color3}>EGP</span></FormLabel>
                </div>
                <FormControlLabel
                  disabled={!el.variation_is_available}
                  value={el.variation_name}
                  control={<Radio />}
                  onChange={() => handleChange(el)}
                  label={labels(el?.variation_name)}
                  className={styles.formControl}
                  sx={{ display: "flex", flexDirection: "column-reverse" }}
                  title="Hard Cover"
                />
             
              </div>
            );
          })}
        </RadioGroup>
        <Button
          type="submit"
          className={styles.btn}
          sx={{ border: "solid 2px" }}
          onClick={addToCartFN}
          endIcon={
            isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "add to cart"
            )
          }
          disabled={isLoading || !type}
        ></Button>
      </FormControl>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        closeButton={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </Box>
  );
}
