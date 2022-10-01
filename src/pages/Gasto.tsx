import { useState } from "react";
import { useGasto } from "../hooks";
import { GastoProps } from "../types";

export default function GastoCreate() {
  const [id, setId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [error, setError] = useState("");
  const { create, remove, update, gastos } = useGasto();

  const salvar = async () => {
    setError("");
    const _valor = parseFloat(valor.replace(",", "."));
    if (_valor > 0) {
      const r =
        id === ""
          ? await create({ descricao, valor: _valor })
          : await update({ id, descricao, valor: _valor });
      if (r.error !== "") {
        setError(r.error);
      }
      else{
        limpar()
      }
    } else {
      setError("Forneça o valor");
    }
  };

  const edit = (obj: GastoProps) => {
    setId(obj.id);
    setDescricao(obj.descricao);
    setValor(obj.valor + "");
  };

  const limpar = () => {
    setId("");
    setDescricao("");
    setValor("");
  };

  const deletar = async (e, id) => {
    e.preventDefault();
    setError("");
    const r = await remove(id);
    if (r.error !== "") {
      setError(r.error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="descricao">Descrição</label>
        <input
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="valor">Valor</label>
        <input
          id="valor"
          value={valor}
          type="text"
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
      {error !== "" && <div>{error}</div>}
      <button onClick={salvar}>Salvar</button>
      <button onClick={limpar}>Limpar</button>
      <div>
        <ul>
          {gastos.map((item) => (
            <li
              key={item.id}
              onClick={() => edit(item)}
              onContextMenu={(e) => deletar(e, item.id)}
            >
              {item.descricao} {item.valor}
            </li>
          ))}
        </ul>
        {gastos.length > 0 && (
          <div>
            <div>Clique com o botão esquerdo para editar</div>
            <div>Clique com o botão direito para excluir</div>
          </div>
        )}
      </div>
    </div>
  );
}
