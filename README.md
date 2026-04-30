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

## Status atual da implementação

Status levantado a partir do código existente em `src` e dos arquivos auxiliares já presentes no projeto.

| Tópico | Status | Observações |
|--------|--------|-------------|
| Status da API (`GET /`) | Implementado | A rota raiz retorna `"Online"`. |
| Autenticação com JWT | Parcial | Existe autenticação com geração de token JWT em `POST /auth/signin`. O README original cita `/login`, mas essa rota ainda não existe com esse caminho. |
| Guard de autenticação | Parcial | Existe `AuthGuard` para validar token Bearer. Não foi encontrado guard de autorização por papel de usuário (admin). |
| Usuários | Parcial | Existe criação de usuário, busca por ID, atualização e remoção. Não existe listagem de usuários para admin (`GET /user`) como descrito na tabela inicial. |
| Hotéis | Não implementado | Não há módulo, controller ou service em `src` para hotel. |
| Quartos | Não implementado | Não há módulo, controller ou service em `src` para room. |
| Reservas | Não implementado | Não há módulo, controller ou service em `src` para booking. |
| Cidades | Não implementado | Não há módulo, controller ou service em `src` para city. |
| Geolocalização | Não implementado | Não há integração com API externa nem rotas `/geo/status` e `/geo/address`. |
| Banco de dados | Parcial | O projeto já usa Prisma e possui schema com `User`, `Booking`, `City`, `Hotel` e `Room`. Porém, o datasource atual está configurado com SQLite, não PostgreSQL. |
| DTOs e validação | Não implementado | Os controllers usam tipos do Prisma diretamente; não foram encontrados DTOs nem validações explícitas das requisições. |
| Testes | Parcial | Existem testes básicos de `PrismaService`, `AuthGuard` e um teste e2e inicial. Ainda não cobrem as funcionalidades principais da API. |
| Docker / docker-compose | Não implementado | Não foi encontrado `Dockerfile` nem `docker-compose.yml` no estado atual do projeto. |
| Logs e monitoramento | Não implementado | Não foram encontrados interceptors, middlewares ou integrações de observabilidade para esse objetivo. |

## O que já foi implementado de forma prática

- Estrutura base do projeto NestJS.
- Rota raiz `GET /` retornando status da API.
- Módulo de usuário com operações de criar, buscar por ID, atualizar e deletar.
- Criptografia de senha com `bcrypt` no cadastro de usuário.
- Módulo de autenticação com emissão de JWT em `POST /auth/signin`.
- Guard para validar token JWT em requisições autenticadas.
- Integração com Prisma via `PrismaService`.
- Schema Prisma com entidades de usuário, reserva, cidade, hotel e quarto.

## O que ainda falta para atender o README original

- Implementar a rota de login no formato documentado ou ajustar definitivamente a documentação para `POST /auth/signin`.
- Implementar autorização por perfil de usuário administrador.
- Implementar listagem de usuários para administrador.
- Implementar módulos de hotel, quarto, reserva, cidade e geolocalização.
- Adicionar DTOs e validação das entradas.
- Ajustar o banco para PostgreSQL, caso esse continue sendo o requisito oficial.
- Criar testes mais completos para regras de negócio e rotas.
- Adicionar configuração de Docker e monitoramento/logs.

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
