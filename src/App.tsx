import './App.css';
import { ToastContainer } from 'react-toastify';
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AppBar from './components/AppBar/AppBar';

function App() {
  return (
    <div className="App">
        <AppBar />
        <Outlet />
        <ToastContainer />
    </div>
  );
}

export default App;
