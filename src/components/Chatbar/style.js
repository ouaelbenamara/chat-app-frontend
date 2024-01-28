import { Box, List, Paper, Typography, styled } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    // width: "fit-content",
    boxSizing: "border-box", // Ensure box sizing includes padding and borders
}));
export const StyledList = styled(List)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    minWidth: "90%",
}));
export const StyledMessage = styled(Paper)(({ theme, position }) => ({
    display: "block",
    maxWidth: "40%",
    alignSelf: position,
    paddingLeft: 5,
    paddingRight: 5,
}));
export const StyledMessageContent = styled(Typography)(({ theme }) => ({
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: "100%", // Adjust the maxWidth to your preference
    borderRadius: "30px",
    backgroundColor: theme.palette.primary.main,
    overflowWrap: "break-word",
    textAlign: "center",
    wordWrap: "break-word",

}));