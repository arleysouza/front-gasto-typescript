import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import UsuarioCreate from "../pages/UsuarioCreate";
import {AuthMenu} from "../components/Menu";

const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <AuthMenu />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario/create" element={<UsuarioCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AuthRoutes;
