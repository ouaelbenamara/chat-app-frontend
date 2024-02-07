import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        secondary: { main: "#1842AB", },
        primary: { main: "#0C2A76" },
        success: { main: '#008823' },
        grey: { main: '#F0ECEC' },
        white: { main: '#FFFFFF' }
        // text: 'white',
        // subText: '#EAEAEA',
        // green: { main: 'green'},
    },
    typography: {
        fontFamily: "cursive",
        subtitle1: {
            fontSize: 14,
            color: 'white'
        },
        subtitle2: {
            fontSize: 10,
        },
        body1: {
            fontWeight: 500,
        },
        body2: {
            fontWeight: 500,
        },
        button: {
            fontStyle: 'italic',
        },// Replace with your custom font




    },

});
