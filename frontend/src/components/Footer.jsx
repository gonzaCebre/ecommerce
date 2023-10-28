import { faInstagram, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <img
        src={require("../media/fumando.gif")}
        alt="alien con gorra"
        className="footer__alien"
      />
      <div className="footer__portada">
        <div className="footer__portada__texts">
          <p className="footer__portada__texts__title">STAY CHILL</p>
          <p className="footer__portada__texts__subtitle">
            PARA GENTE DIFERENTE
          </p>
        </div>
        <div className="footer__redes">
          <p>Redes</p>
          <div className="redes-container">
            <Link to="https://www.instagram.com/staychill.cba">
              <FontAwesomeIcon
                icon={faInstagram}
                className="redes__link__icon ig"
              />
            </Link>
            <Link to="https://open.spotify.com/playlist/5osvOj7D5854coBnCBKDag?si=b2bb1b5876c94f62">
              <FontAwesomeIcon
                icon={faSpotify}
                className="redes__link__icon spotify"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
