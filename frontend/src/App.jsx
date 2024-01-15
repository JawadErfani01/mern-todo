import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="my-2 container">
        <Outlet />
      </div>
    </>
  );
};

export default App;
