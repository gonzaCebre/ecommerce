import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Helmet } from "react-helmet-async";

const App = () => {

  return (
    <>
      <Helmet>
            <title>Stay Chill</title>
            <meta property="og:title" content="Stay Chill" />
            <meta property="og:description" content="Cultura cannabica" />
            <meta property="og:image" content="https://res.cloudinary.com/dpaxljhpr/image/upload/v1704843127/portada_elw0go.png" />
            <meta property="og:url" content="https://frontend-delta-rouge-29.vercel.app/" />
            <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <main>
          <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;