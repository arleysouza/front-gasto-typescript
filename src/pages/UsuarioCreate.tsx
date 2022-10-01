import { useState } from "react";
import { useAuth } from "../hooks";
import history from "../history";

export default function UsuarioCreate() {
  const [mail, setMail] = useState("pedro@teste.com");
  const [senha, setSenha] = useState("123");
  const [error, setError] = useState("");
  const { usuarioCreate } = useAuth();

  const salvar = async () => {
    setError("");
    const r = await usuarioCreate({ mail, senha });
    if (r.error !== "") {
      setError(r.error);
    } else {
      history.push("/login");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="mail">e-mail</label>
        <input
          id="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          value={senha}
          type="password"
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      {error !== "" && <div>{error}</div>}
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}
