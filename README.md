# Hotel Management API

Esta é uma API para gerenciamento de hotéis, desenvolvida utilizando **NestJS**. A aplicação permite o gerenciamento de usuários, reservas, quartos, cidades e hotéis, além de fornecer funcionalidades de autenticação e geolocalização.

## Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/) ou [Prisma](https://www.prisma.io/) (para ORM)
- [PostgreSQL](https://www.postgresql.org/) (banco de dados)
- [Docker](https://www.docker.com/) (para containers e deploy)
- [JWT](https://jwt.io/) (para autenticação)
- [Passport](http://www.passportjs.org/) (para estratégias de autenticação)
- [API externa de Geolocalização](https://developer.mapquest.com/) (para cálculo de distâncias)

## Funcionalidades da API

A API oferece funcionalidades para dois tipos de usuários: **Usuários Comuns** e **Administradores**. As rotas abaixo especificam quais funcionalidades estão disponíveis para cada tipo de usuário.

| Rota          | Método | Funcionalidade para Usuários   | Funcionalidade para Administradores  |
|---------------|--------|-------------------------------|--------------------------------------|
| `/`           | GET    | Retorna uma mensagem de status "Online" da API. | Retorna uma mensagem de status "Online" da API. |
| `/login`      | POST   | Faz login na API.              | Faz login na API.                   |
| `/user`       | GET    | -                             | Retorna todos os usuários.          |
| `/user`       | POST   | Cria um novo usuário.          | Cria um novo usuário.               |
| `/booking`    | POST   | Registra uma reserva em um quarto. | Registra uma reserva em um quarto.  |
| `/city`       | GET    | Retorna todas as cidades.      | Retorna todas as cidades.           |
| `/hotel`      | GET    | Retorna todos os hotéis.       | Retorna todos os hotéis.            |
| `/room/{id}`  | GET    | Retorna informações de um quarto com o ID especificado. | Retorna informações de um quarto com o ID especificado. |
| `/room`       | POST   | -                             | Cria um novo quarto.                |
| `/room/{id}`  | DELETE | -                             | Deleta um quarto pelo ID.           |
| `/hotel`      | POST   | -                             | Cria um novo hotel.                 |
| `/city`       | POST   | -                             | Cria uma nova cidade.               |
| `/city/{id}`  | PUT    | -                             | Edita uma cidade existente.         |
| `/geo/status` | GET    | Retorna o status da API externa responsável pela geolocalização. | Retorna o status da API externa responsável pela geolocalização. |
| `/geo/address`| GET    | Retorna hotéis ordenados por distância de um endereço. | Retorna hotéis ordenados por distância de um endereço. |

## Requisitos da API

### 1. **Autenticação e Autorização**

- Implementar **JWT** para autenticação.
- Proteger rotas administrativas com **Guards** que verifiquem o tipo de usuário (administrador).
- Implementar a funcionalidade de login na rota `/login`.

### 2. **Usuários**

- Criar, listar e gerenciar usuários.
- Usuários comuns podem criar uma conta.
- Apenas administradores podem visualizar a lista de usuários.

### 3. **Hotéis e Quartos**

- Criar, listar e gerenciar hotéis.
- Criar, listar e gerenciar quartos de hotéis.
- Administradores podem adicionar, editar ou deletar hotéis e quartos.
- Usuários podem visualizar hotéis e quartos.

### 4. **Reservas**

- Usuários podem criar reservas para um quarto específico em um hotel.
- Administradores também podem registrar reservas.
  
### 5. **Cidades**

- Criar, listar e editar informações sobre cidades.
- Administradores podem adicionar e editar cidades.

### 6. **Geolocalização**

- Consultar uma API externa para obter a distância de hotéis com base em um endereço fornecido.
- Implementar uma rota `/geo/status` para verificar o status da API externa.
- Implementar uma rota `/geo/address` para listar hotéis ordenados pela distância do endereço fornecido.

### 7. **Banco de Dados**

- Utilizar **PostgreSQL** como banco de dados.
- Implementar **TypeORM** ou **Prisma** para gerenciar as tabelas de usuários, hotéis, quartos, reservas e cidades.
  
### 8. **Validação e DTOs**

- Utilizar **DTOs** para validação de dados nas requisições.
- Garantir que todas as entradas de dados passem por validações antes de serem persistidas no banco.

### 9. **Testes**

- Implementar testes unitários para as funções principais da API.
- Criar testes de integração para validar o funcionamento correto das rotas.

### 10. **Deploy com Docker**

- Configurar um ambiente de desenvolvimento com Docker usando o **docker-compose.yml** para subir o banco de dados e a API.
- Criar um **Dockerfile** para configurar a imagem de produção.
  
### 11. **Monitoramento e Logs**

- Implementar logs para monitorar as requisições e ações importantes no servidor.
- Integrar uma ferramenta de monitoramento como **Prometheus** ou **Grafana** (opcional).

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/hotel-management.git
   ```

2. Instale as dependências:
   ```bash
   cd hotel-management
   npm install
   ```

3. Configure o arquivo `.env` com suas variáveis de ambiente:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/hotels
   JWT_SECRET=sua_chave_secreta_aqui
   ```

4. Rode o Docker:
   ```bash
   docker-compose up
   ```

5. Rode o servidor:
   ```bash
   npm run start:dev
   ```

6. Acesse a API em `http://localhost:3000`.

## Testes

Para rodar os testes, utilize o seguinte comando:

```bash
npm run test
```

---

Com este **README**, você pode acompanhar facilmente o progresso no desenvolvimento da API e verificar as rotas e funcionalidades que ainda faltam implementar.