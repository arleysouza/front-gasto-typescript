## Front-end para persistir dados no back-end

O front-end faz a conexão no back-end para persistir os dados de gastos do usuário. Cada usuário precisa estar logado para cadastrar, listar, excluir e atualizar seus próprios gastos. O código do back-end está disponível em [Servidor construído usando Express, TypeORM, JSON Web Token, Bcrypt e PostgreSQL](https://github.com/arleysouza/servidor-gasto-typeorm-jwt-bcrypt).


### Services
O projeto é estruturado em pastas (pacotes) que agrupam os códigos de acordo com a sua funcionalidade na aplicação. No pacote services está o código responsável processar as requisições no servidor.
O arquivo api.ts possui o objeto do tipo axios que contém os parâmetros de conexão com o servidor:
```
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
```
O arquivo auth.ts possui o código para processar as requisições de usuário do servidor. A seguir tem-se o código para fazer requisição /login no servidor:
```
async login(usuario: UsuarioInputProps):Promise<LoginResProps | Error> {
    try {
        const { data } = await api.post("/login", usuario);
        return data;
    }
    catch (e:any) {
        return { error: e.message };
    }
}
```
Recomenda-se agrupar por arquivo (módulo), do pacote services, as requisições de cada serviço. Como exemplo, no módulo gasto.ts estão as requisições /gasto. Devemos criar outros módulos se surgirem requisições para outros serviços no servidor.

### Context

### Hooks

### Routes