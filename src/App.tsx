import './App.css';
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <div>here</div>Sales
        <Outlet />
        <ToastContainer />
    </div>
  );
}

export default App;
