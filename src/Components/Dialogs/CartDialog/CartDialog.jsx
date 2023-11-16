import React, { useEffect, useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import MenuBookIcon from "@mui/icons-material/MenuBook";
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

export default function CartDialog() {
  const { buyBook } = useSelector(({ cart }) => cart);
  // const { token } = useSelector(({ auth }) => auth);
  const token = localStorage.getItem("access-token");
  const [type, setType] = useState(null);
  const [book, setBook] = useState({
    name: buyBook.name,
    variations: buyBook.variations,
  });

  const dispatch = useDispatch();

  const fontSize = 44;

  const handleChange = ({ target }) => {
    console.log(target.value);
    setType(target.value);
    setBook((prev) => {
      return {
        ...prev,
        type: target.value,
      };
    });
  };
  //${book.name.split(" ").slice(0, 3).join(" ")}
  const addToCartFN = async (e) => {
    console.log(token);
    if (!token) {
      await dispatch(addToCart(book));
      console.log(token);
    } else {
      console.log(token);

      await dispatch(addCartWithToken({ book: book._id, type: book.type }));;
    }
  };

  useEffect(() => {
    console.log(buyBook);
    setBook(buyBook);
  }, []);
  return (
    <Box>
      <FormControl
        fullWidth
        sx={{ minHeight: "200px", justifyContent: "center" }}
      >
        <Typography component="h2" sx={{ textAlign: "center" }}>
          BUY: {book?.name.split(" ").slice(0, 5).join(" ")}......
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
                <FormLabel>{el.variation_name}</FormLabel>
                <FormControlLabel
                  disabled={!el.variation_is_available}
                  value={el.variation_name}
                  control={<Radio />}
                  onChange={handleChange}
                  label={
                    el.variation_name == "hardcover" ? (
                      <MenuBookIcon sx={{ fontSize }} />
                    ) : el.variation_name == "pdf" ? (
                      <PictureAsPdfIcon sx={{ fontSize }} />
                    ) : el.variation_name == "e-book" ? (
                      <AutoStoriesIcon sx={{ fontSize }} />
                    ) : el.variation_name == "audio" ? (
                      <AudioFileIcon sx={{ fontSize }} />
                    ) : (
                      ""
                    )
                  }
                  sx={{ display: "flex", flexDirection: "column-reverse" }}
                  title="Hard Cover"
                />
                <FormLabel>{el.variation_price} EGP</FormLabel>
              </div>
            );
          })}
        </RadioGroup>
        <Button
          disabled={!type}
          type="submit"
          sx={{ border: "solid 2px" }}
          onClick={addToCartFN}
        >
          Add To Cart{" "}
        </Button>
      </FormControl>
    </Box>
  );
}
