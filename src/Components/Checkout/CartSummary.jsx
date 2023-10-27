import { useEffect, useState } from "react";
import { getCart } from "./../../Redux/Slicies/cartAction";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const CartSummary = ({ isEmpty }) => {
  const [cart, setCart] = useState({});
  const dispatch = useDispatch();
  const getCartDetails = async () => {
    const { payload } = await dispatch(getCart());
    if (payload.message === "success" && payload.cart.books.length) {
      // console.log(payload.cart);
      setCart(payload.cart);
    } else {
      isEmpty(true);
    }
  };
  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <>
      <Typography variant="h5" component="h5">
        CartSummary{" "}
        <Avatar color="info" sx={{ display: "inline-flex" }}>
          {cart?.books?.length}
        </Avatar>
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>BookName</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart?.books?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.book.name}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="2">Total (USD)</TableCell>
              <TableCell>{cart?.totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
  // return cart.books?.length ? contentData : <></>;
};

export default CartSummary;
