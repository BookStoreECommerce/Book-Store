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
              <TableCell sx={{textAlign: 'center', fontWeight: 'bolder'}}>BookName</TableCell>
              <TableCell sx={{textAlign: 'center', fontWeight: 'bolder'}}>Type</TableCell>
              <TableCell sx={{textAlign: 'center', fontWeight: 'bolder'}}>Qty</TableCell>
              <TableCell sx={{textAlign: 'center', fontWeight: 'bolder'}}>price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.books.map((item) => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell align="center">{item.book.name}</TableCell>
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
