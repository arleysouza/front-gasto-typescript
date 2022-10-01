import { useState, useEffect } from "react";
import { useAuth } from "../hooks";

export default function UsuarioUpdate() {
  const [mail, setMail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const { usuarioUpdate, mailLogin } = useAuth();

  useEffect(() => {
    setMail(mailLogin);
  }, [mailLogin]);

  const salvar = async () => {
    setMsg("");
    if (mail !== "" || senha !== "") {
      const r = await usuarioUpdate({ mail, senha });
      if (r.error !== "") {
        setMsg(r.error);
      } else {
        setMsg("Atualizado com sucesso");
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
      {msg !== "" && <div>{msg}</div>}
      <button onClick={salvar}>Atualizar</button>
    </div>
  );
}
