import Categories from "../components/Categories";
import Advertise from "../components/Advertise";
import FeedInstagram from "../components/FeedInstagram";
import { Helmet } from "react-helmet-async";

const HomeScreen = () => {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Título Open Graph" />
      </Helmet>
      <div className="foto-index__container">
        <img src={require("../media/foto-index.jpg")} alt="" />
      </div>

      <Advertise />
      <Categories />

      <Advertise />

      <FeedInstagram />
    </>
  );
};

export default HomeScreen;
