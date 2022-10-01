import {useContext} from 'react';
import {GastoContext} from '../contexts';
import {GastoContextProps} from '../types';

// useAuth é um hook que definimos
// ele retorna as propriedades do value do AuthContext.Provider
export default function useGasto() {
  const context = useContext<GastoContextProps>(GastoContext);

  if (!context) {
    throw new Error('hook useAuth está sendo chamado fora do AuthProvider');
  }

  return context;
}