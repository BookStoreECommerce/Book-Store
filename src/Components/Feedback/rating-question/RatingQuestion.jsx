import { Box, Typography } from "@mui/material";

const RatingQuestion = (props) => {
  const { question, type, value, setValue } = props;
  return (
    <>
      <Box
        sx={{
          flexFlow: "column",
        }}
      >
        <Box
          component={"div"}
          sx={{
            mt: 10,
            ml: 5,
            color: "#2B3A55",
            fontFamily: `"Jost", sans-serif !important`
          }}
        >
          <Typography variant="h5" sx={{fontFamily: `"Jost", sans-serif !important`}}>{question}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default RatingQuestion;
