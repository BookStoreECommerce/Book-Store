import { Box, Rating, Typography } from "@mui/material";

const Stars = () => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        alignItems: "center",
        gap: '3rem'
      }}
    >
      <Rating
        name="half-rating"
        defaultValue={2.5}
        precision={0.5}
        size="large"
        sx={{
          fontSize: "50px",
        }}
      />
      <Typography variant="h5" color='#ce7777'>Your Rate</Typography>
    </Box>
  );
};
export default Stars;
