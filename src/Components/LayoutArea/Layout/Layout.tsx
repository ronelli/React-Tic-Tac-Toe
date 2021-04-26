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
            <div className="Layout Box" style={rootStyle} >
                <Header />
                <Grid container 
                    direction="column"
                    alignItems="center"
                >
                    <main><Game /></main>
                </Grid>
                <Footer />
            </div>
        </>
    );
}

export default Layout;
