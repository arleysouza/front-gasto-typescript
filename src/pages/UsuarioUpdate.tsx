import { useState, useEffect } from "react";
import { useAuth } from "../hooks";
import history from "../history";

export default function UsuarioUpdate() {
  const [mail, setMail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { usuarioUpdate, mailLogin } = useAuth();

  useEffect(() => {
    setMail(mailLogin);
  }, [mailLogin]);

  const salvar = async () => {
    setError("");
    if (mail !== "" || senha !== "") {
      const r = await usuarioUpdate({ mail, senha });
      if (r.error !== "") {
        setError(r.error);
      } else {
        history.push("/login");
      }
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
      <button onClick={salvar}>Atualizar</button>
    </div>
  );
}
