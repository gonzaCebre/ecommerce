import Categories from "../components/Categories";
import Advertise from "../components/Advertise";
import FeedInstagram from "../components/FeedInstagram";

const HomeScreen = () => {
  return (
    <>
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
