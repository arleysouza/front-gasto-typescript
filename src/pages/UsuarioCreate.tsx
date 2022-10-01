import { useState } from "react";
import { useAuth } from "../hooks";

export default function UsuarioCreate() {
  const [mail, setMail] = useState("pedro@teste.com");
  const [senha, setSenha] = useState("123");
  const [msg, setMsg] = useState("");
  const { usuarioCreate } = useAuth();

  const salvar = async () => {
    setMsg("");
    const r = await usuarioCreate({ mail, senha });
    if (r.error !== "") {
      setMsg(r.error);
    } else {
      setMsg("Cadastrado com sucesso");
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
      <button onClick={salvar}>Salvar</button>
    </div>
  );
}
