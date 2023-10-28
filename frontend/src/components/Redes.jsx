import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpotify,
  faInstagram,
  faTelegram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

function Redes() {
  return (
    <section className="redes-section">
      <h2>SUMATE A LAS REDES</h2>
      <div className="redes">
        <Link to="https://www.instagram.com" className="redes__link">
          <FontAwesomeIcon
            icon={faInstagram}
            className="redes__link__icon ig"
          />
        </Link>
        <Link to="https://www.telegram.com" className="redes__link">
          <FontAwesomeIcon
            icon={faTelegram}
            className="redes__link__icon telegram"
          />
        </Link>
        <Link to="https://www.youtube.com" className="redes__link">
          <FontAwesomeIcon
            icon={faYoutube}
            className="redes__link__icon youtube"
          />
        </Link>
        <Link to="https://www.spotify.com" className="redes__link">
          <FontAwesomeIcon
            icon={faSpotify}
            className="redes__link__icon spotify"
          />
        </Link>
      </div>
    </section>
  );
}

export default Redes;
