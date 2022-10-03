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
O objeto context é usado para propagar variáveis e funções através da estrutura de componentes da aplicação. Como exemplo, considere o módulo Auth.tsx, nele foi centralizada as operações de autenticação de usuário que serão retornadas através do contexto AuthContext. As variáveis e funções são propagados através da propriedade value do Provider:
```
<AuthContext.Provider
  value={{login, logout, logado, setLogado, isLoading,
          usuarioCreate, usuarioUpdate, mailLogin }} >
  {children}
</AuthContext.Provider>
```
Os componentes children poderão usar as variáveis e funções do value através da função useContext. Constitui erro tentar usar o contexto fora de algum componente children.


### Hooks
Definimos o hook useAuth para retornar as propriedades (variáveis e funções) do value do AuthContext:
```
export default function useAuth() {
  const context = useContext<AuthContextProps>(AuthContext);

  if (!context) {
    throw new Error('hook useAuth está sendo chamado fora do AuthProvider');
  }

  return context;
}
```
Na prática o hook useAuth está empacotando as propriedades do AuthContext. Desta forma, podemos usar as propriedades do contexto apenas chamando a função useAuth. No exemplo a seguir está sendo importada a função login no módulo src/pages/Login.tsx:
```
const { login } = useAuth();
```


### Routes
As rotas são definidas usando os componentes BrowserRouter, Routes e Route do pacote react-router-dom. Como exemplo, a rota localhost:3000/usuario/create chamará o componente UsuarioCreate. As rotas são usadas para renderizar componentes a partir de URLs.
```
<BrowserRouter>
  <AuthMenu />
  <Routes>
    <Route path="*" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/usuario/create" element={<UsuarioCreate />} />
  </Routes>
</BrowserRouter>
```
Existem apenas os níveis de acesso “logado” e “não logado”, então agrupou-se as rotas por nível de acesso nos arquivos src/routes/AppRoutes.tsx (logado) e AuthRoutes.tsx (não logado). Para mudar de nível de acessou usou-se o atributo logado do contexto AuthContext, disponível através do hook useAuth. O estado logado é mudado através dos métodos login e logout do contexto AuthContext. Centralizar o controle em um estado do contexto faz com que toda a árvore de componentes seja renderizada ao sofrer alguma alteração. Desta forma, ao efetuar o logout as telas serão alteradas imediatamente.
O contexto AuthContext foi definido na raiz da aplicação, no componente App. Desta forma, todos os componentes podem utilizar o hook useAuth:
```
<AuthProvider>
  <Routes />
</AuthProvider>
```
O contexto GastoContexto foi definido para os componentes vinculados ao gerenciamento de gastos, pois não faz sentido ter essas operações disponíveis em outras partes do código.
```
<BrowserRouter>
  <AppMenu />
  <GastoProvider>
    <Routes>
      <Route path="*" element={<Gasto />} />
      <Route path="/usuario/update" element={<UsuarioUpdate />} />
      <Route path="/gasto" element={<Gasto />} />
    </Routes>
  </GastoProvider>
</BrowserRouter>
```
Para efetuar a navegação utilizou-se os componentes NavLink e Link do pacote react-router-dom (arquivo Menu.tsx). Porém a navegação poderia ser feita a partir de código JavaScript:
```
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/home');
```