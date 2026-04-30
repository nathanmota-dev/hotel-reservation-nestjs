# Plano de Testes com Vitest

## Resumo
Criar uma frente de trabalho em duas etapas:
1. ajustar os testes já existentes para o padrão do Vitest;
2. criar testes unitários para arquivos sem cobertura, com foco em `services` e `controllers`.

O plano não altera comportamento da API em runtime; as mudanças ficam restritas à suíte de testes, convenções de mocks e organização dos arquivos de teste.

## Parte 1: Trocar os testes existentes para Vitest
- Revisar os testes atuais em `src/database/prisma.service.spec.ts`, `src/auth/guards/auth.guard.spec.ts` e `test/app.e2e-spec.ts`.
- Padronizar imports e helpers do Vitest:
  - usar `vi` no lugar de `jest`;
  - usar globais do Vitest (`describe`, `it`, `expect`, `beforeEach`, `afterEach`) de forma consistente;
  - evitar qualquer dependência restante de tipos ou APIs do Jest.
- Garantir que os testes unitários fiquem separados dos e2e na configuração:
  - unitários rodando pelo `vitest.config`;
  - e2e rodando por config dedicada.
- Ajustar o e2e para o ambiente atual do projeto:
  - manter o teste de `GET /`;
  - resolver a estratégia de execução com `supertest` sem depender de comportamento específico do Jest;
  - fechar a aplicação ao final de cada execução para evitar recursos pendurados.
- Validar que os testes já existentes passem com os scripts atuais:
  - `npm test`
  - `npm run test:e2e`

## Parte 2: Criar testes para arquivos sem cobertura
Criar novos arquivos de teste para estes alvos:

- `src/app/app.service.ts`
- `src/auth/auth.service.ts`
- `src/user/user.service.ts`
- `src/app/app.controller.ts`
- `src/auth/auth.controller.ts`
- `src/user/user.controller.ts`

Cobertura esperada por grupo:

- `AppService`
  - deve retornar a mensagem atual exposta pelo serviço.
- `AuthService`
  - deve retornar `NotFoundException` quando usuário não existir;
  - deve retornar `UnauthorizedException` quando senha estiver incorreta;
  - deve retornar `access_token` quando autenticação for válida;
  - deve mockar `UserService`, `JwtService` e `bcrypt.compare`.
- `UserService`
  - deve buscar usuário por critério;
  - deve criar usuário com senha hasheada;
  - deve atualizar usuário;
  - deve deletar usuário;
  - deve mockar `PrismaService` e `bcrypt.hash`.
- `AppController`
  - deve delegar para `AppService.getWelcomeMessage`;
  - deve retornar o valor recebido do service.
- `AuthController`
  - deve delegar `signIn` para `AuthService.singIn`;
  - deve repassar o body sem transformação inesperada.
- `UserController`
  - deve delegar criação para `createUser`;
  - deve converter `id` de string para número em busca, update e delete;
  - deve repassar payloads corretamente para o `UserService`.

## Mudanças de interface e convenções
- Não haverá mudança de API HTTP nem de contratos de produção.
- A convenção nova de testes passa a ser:
  - `*.spec.ts` para unitários ao lado do código;
  - `*.e2e-spec.ts` para testes end-to-end em `test/`.
- O plano salvo em `TEST_PLAN.md` registra explicitamente que:
  - `services` e `controllers` entram na segunda fase;
  - `modules`, `main.ts` e outros bootstrap files ficam fora deste ciclo.

## Testes e critérios de aceite
- Todos os testes unitários antigos e novos devem rodar em `npm test`.
- O e2e existente deve rodar em `npm run test:e2e`.
- Nenhum arquivo de teste deve usar `jest.fn`, `jest.spyOn` ou tipos do Jest.
- Cada novo teste deve validar comportamento observável e não apenas `should be defined`, exceto onde fizer sentido como smoke test complementar.
- A suíte deve usar mocks explícitos para dependências externas como Prisma, JWT e bcrypt.

## Assunções
- Nome do arquivo do plano: `TEST_PLAN.md`.
- Escopo da segunda etapa: `services + controllers`.
- `AuthGuard`, `modules` e `main.ts` não entram como alvo de novos testes nesta rodada, além do que já existir.
- O objetivo é melhorar cobertura útil, priorizando regras de negócio e delegação entre controller e service, não inflar quantidade de testes superficiais.
