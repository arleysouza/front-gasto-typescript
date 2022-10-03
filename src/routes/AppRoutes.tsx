import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsuarioUpdate from "../pages/UsuarioUpdate";
import Gasto from "../pages/Gasto";
import { AppMenu } from "../components/Menu";
import { GastoProvider } from "../contexts/GastoContext";

const AppRoutes = () => {
  return (
<BrowserRouter>
  <AppMenu />
  <GastoProvider>
    <Routes>
      <Route path="*" element={<Gasto />} />
      <Route path="/usuario/update" element={<UsuarioUpdate />} />
      <Route path="/gasto" element={<Gasto />} />
    </Routes>
  </GastoProvider>
</BrowserRouter>
  );
};

export default AppRoutes;
