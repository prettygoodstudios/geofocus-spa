import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Styler from "./Styler";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#9013FE",
        },
        secondary: {
            main: "#ECECEC",
        }
    },
    typography: {
        fontFamily: "Avenir"
    }
});


const StyleProvider: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <Styler>
                { children }
            </Styler>
        </ThemeProvider>
    );
};

export default StyleProvider;
