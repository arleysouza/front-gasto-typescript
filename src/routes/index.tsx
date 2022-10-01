import AuthRoutes from './AuthRoutes';
import AppRoutes from './AppRoutes';
import Loading from "../components/Loading";
import {useAuth} from '../hooks';

export default function Routes() {
  const { logado, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return !logado ? <AuthRoutes /> : <AppRoutes />;
}
