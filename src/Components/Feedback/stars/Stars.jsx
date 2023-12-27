import { Box, Rating, Typography } from "@mui/material";

const Stars = ({ onChange, name }) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        alignItems: "center",
        gap: "3rem",
      }}
    >
      <Rating
        defaultValue={2.5}
        precision={0.5}
        size="large"
        sx={{
          fontSize: "50px",
        }}
        onChange={onChange}
        name={name}
      />
      <Typography variant="h5" color="#ce7777">
        Your Rate
      </Typography>
    </Box>
  );
};
export default Stars;
