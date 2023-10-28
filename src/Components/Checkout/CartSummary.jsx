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
      <Typography variant="h6" component="h6">
        Cart summary
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>BookName</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.books.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.book.name}</TableCell>
                <TableCell align="center">{item.qty}</TableCell>
                <TableCell align="center">{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6" component="h6">
                  Total (USD)
                </Typography>
              </TableCell>
              <TableCell align="center" colSpan="2">
                <Typography variant="h6" component="h6">
                  {cart.totalAmount}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartSummary;
