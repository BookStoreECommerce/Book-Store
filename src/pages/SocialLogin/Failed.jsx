import { Typography } from "@mui/material";

const Failed = () => {
    return (
        <Typography variant="h3" sx={{
            color: (theme) => theme.palette.primary.dark
        }} > Logged in failed please try again </Typography >
    )
}

export default Failed;