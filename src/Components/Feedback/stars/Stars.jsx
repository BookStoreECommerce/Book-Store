import { Box, Rating, Typography } from "@mui/material";
import Styles from './Stars.module.css'

const Stars = () => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        alignItems: "center",
        gap: '3rem'
      }}
      className={`${Styles.gap}`}
    >
      <Rating
        name="half-rating"
        defaultValue={2.5}
        precision={0.5}
        size="large"
        sx={{
          fontSize: "50px",
        }}
        className={Styles.rate}
      />
      <Typography variant="h5" color='#ce7777'>Your Rate</Typography>
    </Box>
  );
};
export default Stars;
