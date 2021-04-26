import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";
import Game from "../../BoardArea/Game/Game";
import { Grid } from "@material-ui/core";



function Layout(): JSX.Element {
    const rootStyle = {
        minHeight: '100vh'
    };
    return (
        <>
            <Grid container className="Layout Box" style={rootStyle}
                    direction="column"
                    justify="space-between"
                    alignItems="center"
            >
                <Header />
                    <main><Game /></main>
                <Footer />
            </Grid>
        </>
    );
}

export default Layout;
