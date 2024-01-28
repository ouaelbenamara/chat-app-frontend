import { styled,Box, Stack, InputBase } from "@mui/material";


export const StyledContainer = styled(Stack)(({ theme }) => ({
    paddingTop: '50px',

    flex:'1',
    // height: "100vh",
    // display: "flex",
    alignItems:'center',
backgroundColor:theme.palette.grey[300],
    // flexDirection: "column",
    // width: "fit-content",
    // boxSizing: "border-box", // Ensure box sizing includes padding and borders
}));

export const Wrapper = styled(Box)(({ theme }) => ({

    flex:'1',
    height: "100vh",
    // display: "flex",
backgroundColor:theme.palette.grey[300],
    // flexDirection: "column",
    // width: "fit-content",
    // boxSizing: "border-box", // Ensure box sizing includes padding and borders
}));
export const StyledBox = styled(Box)(({ theme }) => ({
    borderRadius:'10px',
    marginTop:'10px',
    backgroundColor: theme.palette.grey[100],
    minWidth:'50%',
    display: "flex",
    // alignItems:'center',
    flexDirection: "row",
    // width: "fit-content",
    boxSizing: "border-box", // Ensure box sizing includes padding and borders
}));
export const SearchEngine = styled(InputBase)(({ theme }) => ({
    borderRadius:'10px',
    backgroundColor: theme.palette.grey[100],

}));