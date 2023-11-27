import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const CartSummary = ({ cart }) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>BookName</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.books.map((item) => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell>{item.book.name}</TableCell>
                <TableCell align="center">{item.variation_name}</TableCell>
                <TableCell align="center">{item.qty}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell align="center">
                  Total (USD)
              </TableCell>
              <TableCell align="center" colSpan="2">
                  {cart.totalAmount}
              </TableCell>
            </TableRow>
            {cart.coupon_code && (
              <TableRow>
                <TableCell align="center">
                    Total after discount (USD)
                </TableCell>
                <TableCell align="center" colSpan="2">
                    {cart.totalAmountAfterDisc}
                </TableCell>
              </TableRow>
            )}
          </TableFooter> */}
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartSummary;
