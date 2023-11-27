import React, { useState } from "react";
import styles from "./BookProfile.module.css";
import { Box, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LoopIcon from "@mui/icons-material/Loop";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Slicies/cartSlice.js";
import { addCartWithToken } from "../../Redux/Slicies/cartAction.js";
import { toast } from "react-toastify";
export default function AddToCartFromProfile({ book }) {
  const fontSize = 44;
  const token = localStorage.getItem("access-token");
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [buyBook, setBuyBook] = useState({
    ...book,
  });
  const { isLoading } = useSelector(({ cart }) => cart);
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
  const selectType = (variation_name) => {
    // buyBook.variation_name = variation_name;
    setBuyBook((prev) => {
      return { ...prev, variation_name };
    });
  };
  const addToCartFn = async () => {
    if (token) {
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
          variation_name: buyBook?.variation_name,
        })
      );
      toast.dismiss(buyBook._id);
    } else {
      dispatch(addToCart(buyBook));
    }
    addAlert();
    setBuyBook((prev) => {
        return { ...prev, variation_name: null };
      });
  };
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 4 }}>
        {book?.variations?.map((el) => (
          <Button
            disabled={!el.variation_is_available || isLoading}
            onClick={() => {
              selectType(el?.variation_name);
            }}
            variant="contained"
            endIcon={labels(el?.variation_name)}
            key={el?.variation_name}
            sx={{
              borderRadius: 5,
              backgroundColor:
                el?.variation_name === buyBook?.variation_name ? "#2b3a55" : "",
              opacity: 1,
            }}
          >
            {el.variation_name}: {el.variation_price} EGP
          </Button>
        ))}
      <Button
        type="submit"
        sx={{ borderRadius: 4, border: "solid 2px", marginInlineStart: "auto", display:'flex' }}
        onClick={addToCartFn}
        endIcon={!isLoading ?  <AddShoppingCartIcon />  :  <AutorenewIcon /> }
        disabled={isLoading || !buyBook?.variation_name}
      >Add To Cart</Button>
      </Box>
    </Box>
  );
}
