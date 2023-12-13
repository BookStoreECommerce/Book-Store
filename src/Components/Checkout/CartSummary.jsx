import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CartSummary = ({ cart }) => {
  return (
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
        </Table>
      </TableContainer>
  );
};

export default CartSummary;
