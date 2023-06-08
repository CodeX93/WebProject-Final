import "./App.css";
import { Route, Routes } from "react-router-dom";
import HeaderNavBar from "./Components/HeaderNavBar";
import DownPayment from "./Screens/DownPayment";
import HomeScreen from "./Screens/HomeScreen";
import InsurancePlans from "./Screens/InsurancePlans";
import Login from "./Screens/Login";
import Project from "./Screens/Project";
import SignUp from "./Screens/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/insurance" element={<InsurancePlans />} />
      <Route path="/project" element={<Project />} />
      <Route path="/payment" element={<DownPayment />} />
      <Route path="/home" element={<HomeScreen />} />
    </Routes>
  );
}

export default App;
