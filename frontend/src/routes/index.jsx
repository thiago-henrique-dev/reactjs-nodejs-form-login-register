import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from '../pages/personInformation/index'
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="/account/check-first-access" element={<Login />} />
        <Route path="/account/personal-information" element={<Home />}/>
       
      </Routes>
    </Router>
  );
};
