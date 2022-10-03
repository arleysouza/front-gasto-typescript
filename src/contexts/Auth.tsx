import { createContext, useState, useEffect } from "react";
import auth from "../services/auth";
import { UsuarioInputProps } from "../types";
import api from "../services/api";
import { AuthContextProps } from "../types";

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

// extrai o children em <AuthProvider> children </AuthProvider>
// no children estarão as rotas definidas por Navigator e Screen
export const AuthProvider = ({ children }: any) => {
  const [logado, setLogado] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mailLogin, setMailLogin] = useState("");

  // o useEffect que vai ser disparado assim que o AuthProvider for construído na tela
  useEffect(() => {
    const storage = localStorage.getItem("@token");
    if (storage) {
      const token = JSON.parse(storage);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const mail = localStorage.getItem("@mail");
      if (mail) {
        setMailLogin(JSON.parse(mail));
      }
      setLogado(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (usuario: UsuarioInputProps) => {
    const response: any = await auth.login(usuario);
    if (response.token) {
      localStorage.setItem("@token", JSON.stringify(response.token));
      localStorage.setItem("@mail", JSON.stringify(response.mail));
      // coloca o token no header das requisições do Axios
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      setMailLogin(response.mail);
      setLogado(true);
      return { error: "" };
    }
    return response;
  };

  const logout = async () => {
    setLogado(false);
    setMailLogin("");
    localStorage.removeItem("@token");
    localStorage.removeItem("@mail");
    api.defaults.headers.common["Authorization"] = "";
  };

  const usuarioCreate = async (
    usuario: UsuarioInputProps
  ): Promise<{ error: string }> => {
    const response: any = await auth.create(usuario);
    if (response.token) {
      localStorage.setItem("@token", JSON.stringify(response.token));
      localStorage.setItem("@mail", JSON.stringify(response.mail));
      // coloca o token no header das requisições do Axios
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      setMailLogin(response.mail);
      setLogado(true);
      return { error: "" };
    }

    return response;
  };

  const usuarioUpdate = async (
    usuario: UsuarioInputProps
  ): Promise<{ error: string }> => {
    const response: any = await auth.update(usuario);
    if (response.id) {
      if (response.mail) {
        setMailLogin(response.mail);
        localStorage.setItem("@mail", JSON.stringify(response.mail));
      }
      return { error: "" };
    }
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        logado,
        setLogado,
        isLoading,
        usuarioCreate,
        usuarioUpdate,
        mailLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
