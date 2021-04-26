import "./SocialFollow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub
  } from "@fortawesome/free-brands-svg-icons";

function SocialFollow(): JSX.Element {
    return (
        <div className="SocialFollow">
            <a href="https://www.linkedin.com/in/ron-elli" className="youtube social"> 
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com/ronelli?tab=repositories" className="youtube social"> 
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>	
        </div>
    );
}

export default SocialFollow;
