import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";
import Game from "../../BoardArea/Game/Game";

function Layout(): JSX.Element {
    return (
        <div className="Layout Box">
			<Header />
            <main><Game /></main>
            <Footer />
        </div>
    );
}

export default Layout;
