import { AuthProvider } from "./contexts";
import Routes from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
