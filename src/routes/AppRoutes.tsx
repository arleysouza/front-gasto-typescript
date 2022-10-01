import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import UsuarioUpdate from "../pages/UsuarioUpdate";
import GastoCreate from "../pages/GastoCreate";
import { AppMenu } from "../components/Menu";
import { GastoProvider } from "../contexts/GastoContext";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppMenu />
      <GastoProvider>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/usuario/update" element={<UsuarioUpdate />} />
          <Route path="/gasto" element={<GastoCreate />} />
        </Routes>
      </GastoProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
