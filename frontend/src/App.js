import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BASE_URL } from "./constants";

const App = () => {

  console.log(BASE_URL)

  return (
    <>
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