import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChargerList from "./components/ChargerList";
import AddCharger from "./components/AddCharger";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import MapView from "./pages/MapView";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (<>
  <ToastContainer position="top-center" />
    <BrowserRouter>
    <Navbar/>
    
      <Routes>
        {/* <Route path="/chargerlist" element={<ChargerList/>} /> */}
        {/* <Route path="/addcharger" element={<AddCharger/>} /> */}
        <Route path="/" element={<MapView/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/map" element={<MapView />} />
        <Route path="/chargerlist" element={<PrivateRoute><ChargerList /></PrivateRoute>}/>
        <Route path="/addcharger" element={<PrivateRoute><AddCharger /></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
