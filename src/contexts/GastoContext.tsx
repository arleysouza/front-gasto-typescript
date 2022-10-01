import { createContext, useState, useEffect } from "react";
import service from "../services/gasto";
import { GastoInputProps, GastoContextProps, GastoProps } from "../types";
import { useAuth } from "../hooks";

export const GastoContext = createContext<GastoContextProps>(
  {} as GastoContextProps
);

// extrai o children em <GastoProvider> children </GastoProvider>
// no children estarão as rotas definidas por Navigator e Screen
export const GastoProvider = ({ children }: any) => {
  const [gastos, setGastos] = useState([]);
  const { mailLogin } = useAuth();

  // o useEffect que vai ser disparado assim que o AuthProvider for construído na tela
  useEffect(() => {
    if (mailLogin !== "") {
      list();
    } else {
      setGastos([]);
    }
  }, [mailLogin]);

  const create = async (gasto: GastoInputProps): Promise<{ error: string }> => {
    const response: any = await service.create(gasto);
    if (response.id) {
      list();
      return { error: "" };
    }

    return response;
  };

  const list = async () => {
    const response: any = await service.list();
    if (!response.error) {
      setGastos(response);
    }
  };

  const remove = async (id: string): Promise<{ error: string }> => {
    const response: any = await service.delete(id);
    if (!response.error) {
      list();
      return { error: "" };
    }
    return response;
  };

  const update = async (gasto: GastoProps) => {
    const response: any = await service.update(gasto);
    if (response.id) {
      list();
      return { error: "" };
    }

    return response;
  };

  return (
    <GastoContext.Provider
      value={{
        create,
        gastos,
        remove,
        update,
      }}
    >
      {children}
    </GastoContext.Provider>
  );
};
