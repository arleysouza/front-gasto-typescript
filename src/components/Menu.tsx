import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks";

export const AppMenu = () => {
  const { logout } = useAuth();
  return (
    <NavLink to="/home">
      <Link to="/usuario/update">
        <button>Atualizar</button>
      </Link>
      <Link to="/gasto">
        <button>Gastos</button>
      </Link>

      <button onClick={() => logout()}>Logout</button>
    </NavLink>
  );
};

export const AuthMenu = () => {
  return (
    <NavLink to="/home">
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/usuario/create">
        <button>Cadastrar-se</button>
      </Link>
    </NavLink>
  );
};

