import { useEffect, useState } from "react";
import { INSTAGRAM_URL } from "../constants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const FeedInstagram = () => {
  const [feedIg, setFeedIg] = useState([]);
  const [igToken, setIgToken] = useState([]);

  useEffect(() => {
    fetch(`${INSTAGRAM_URL}`)
      .then((response) => response.json()) // convertir a json
      .then((json) => setIgToken(json.igToken)) //imprimir los datos en la consola;
      .then(() => console.log(igToken)); //imprimir los datos en la consola;
  }, [igToken]);

  useEffect(() => {
    fetch(
      `https://graph.instagram.com/me/media?fields=media_type,media_url,caption,permalink&access_token=${igToken}`
    )
      .then((response) => response.json()) // convertir a json
      .then((json) => setFeedIg(json.data.slice(0, 4)))
      .catch((error) => {
        console.error("Error fetching Instagram data:", error);
      });
  }, [igToken]);

  return (
    <div className="feedIg-container">
      <h3>¿TODAVÍA NO NOS SEGUÍS EN IG?</h3>
      <div className="feedIg my-4">
        {feedIg.map((post) => (
          <div className="feedIg__post">
            <div className="feedIg__post__img">
              <img src={post.media_url} alt="" />
            </div>
            <p className="feedIg__post__title no-mostrar">{post.caption}</p>
            <Link to={post.permalink} className="overlay" target="_blank">
              <FontAwesomeIcon
                icon={faInstagram}
                className="redes__link__icon ig"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedInstagram;
