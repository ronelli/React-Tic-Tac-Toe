import "./Footer.css";
import { Typography } from "@material-ui/core";
import SocialFollow from "../../FooterArea/SocialFollow/SocialFollow";
function Footer(): JSX.Element {
    return (
        <Typography variant="subtitle2" className="footer">
            Copyright © ron_elli - All rights reserved.
            <SocialFollow />
        </Typography>
    );
}

export default Footer;
