# Desafio Node-Express-API

Desafio técnico - Full stack

Desafio: Elaborar uma solução com as seguintes tecnologias:
Backend REST:
Node
Typescript
Express
Docker
Banco de dados Postgres
MicroServiço AWS / Lambda (opcional)
Frontend:
Typescript
React
ViteJS (opcional)

## Deploy

O projeto está rodando em um container docker numa instância EC2 da AWS

```bash
  http://18.230.150.26:8080/
```

## Aprendizados

Foi a minha primeira API desenvolvida com Express, havia feito antes somente com o framework NextJS integrado junto com o Front-End, foi uma experiência bastante enriquecedora e gratificante em ver tudo funcionando no final. Aprendi bastante sobre Docker no qual tinha quase zero contato, subi a api em uma instância EC2 na AWS(Isso foi muito legal)

Não consegui cumprir todos os requisitos no front-end, pois acabei ficando bastante no back, porém, não deixou de ser uma experiência extremamente enriquecedora.

## Arquitetura

Seguindo os princípios SOLID, desenvolvi a api utilizando Clean Architecture. Do qual se divide em três principais layers, Domain, Data e Presentation.

Domain é onde se encontra as regras de negócio da api, ditando os contratos dos repositórios, entidades e casos de uso.

Seguido pelo Data Layer onde se encontra a implementação dos repositórios definidos no Domain Layer, assim como a implementação de classes para efetivamente se conectar com fontes externas para obter os dados necessários seguindo a lógica definida acima.

Por último de não menos importante, o Presentation Layer onde se encontra o router.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/WagDevX/NodeExpressApi.git
```

Entre no diretório do projeto

```bash
  cd NodeExpressApi
```

Inicie o servidor no modo desenvolvimento

```bash
  docker compose -f docker-compose.dev.yml
```

ou Inicie o servidor no modo produção

```bash
  docker compose up
```

## Rodando os testes

Atualmente há 112 testes, maioria dos arquivos com 100% de cobertura, alguns ficaram por conta de modificações posteriores

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```

## Documentação da API

#### Cria uma conta

```http
  POST /auth/register
```

#### Fazer autênticação

```http
  POST /auth/login
```

| Parâmetro  | Tipo     | Descrição                        |
| :--------- | :------- | :------------------------------- |
| `username` | `string` | **Obrigatório**. Nome de usuário |
| `password` | `string` | **Obrigatório**. Senha           |

#### Retorna todos os usuários

```http
  GET /auth/getall
```

| Parâmetro       | Tipo     | Descrição                                     |
| :-------------- | :------- | :-------------------------------------------- |
| `x-acess-token` | `header` | **Obrigatório**. Token do usuário autenticado |

#### Obter todas as pastas

```http
GET /folders/getall
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |

#### Obter detalhes de uma pasta por ID

```http
  GET /folders/:id
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID da pasta                  |

#### Obter pastas por proprietário

```http
  GET /folders/owner/:id
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID do proprietário           |

#### Criar uma nova pasta

```http
  POST /folders/
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `body`           | `json`   | **Obrigatório**. Dados da nova pasta          |

#### Renomear uma pasta

```http
  PUT /folders/rename/:id
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID da pasta                  |
| `body`           | `json`   | **Obrigatório**. Novo nome da pasta           |

#### Mover uma pasta

```http
  PUT /folders/move/:id
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID da pasta                  |
| `body`           | `json`   | **Obrigatório**. ID da nova pasta pai         |

#### Deletar uma pasta

```http
  DELETE /folders/:id
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID da pasta                  |

#### Obter arquivos por ID de Pasta

```http
  GET /files/:id?owner=<owner_id>
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID da pasta                  |
| `owner`          | `query`  | **Obrigatório**. ID do proprietário           |

#### Criar um novo arquivo

```http
  POST /files/
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `body`           | `json`   | **Obrigatório**. Dados do novo arquivo        |

#### Renomear um arquivo

```http
  PUT /files/rename/:id
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID do arquivo                |
| `body`           | `json`   | **Obrigatório**. Novo nome do arquivo         |

#### Mover um arquivo

```http
  PUT /files/move/:id
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID do arquivo                |
| `body`           | `json`   | **Obrigatório**. ID da nova pasta             |

#### Deletar um arquivo

```http
  DELETE /files/:id
```

| Parâmetro        | Tipo     | Descrição                                     |
| :--------------- | :------- | :-------------------------------------------- |
| `x-access-token` | `header` | **Obrigatório**. Token do usuário autenticado |
| `id`             | `path`   | **Obrigatório**. ID do arquivo                |

#### Criar uma nova permissão

```http
  POST /permissions/
```

| Parâmetro | Tipo   | Descrição                                |
| :-------- | :----- | :--------------------------------------- |
| `body`    | `json` | **Obrigatório**. Dados da nova permissão |

#### Atualizar uma permissão

```http
  PUT /permissions/:id
```

| Parâmetro | Tipo   | Descrição                                       |
| :-------- | :----- | :---------------------------------------------- |
| `id`      | `path` | **Obrigatório**. ID da permissão                |
| `body`    | `json` | **Obrigatório**. Dados atualizados da permissão |

#### Obter todas as permissões

```http
  GET /permissions/
```

| Parâmetro | Tipo   | Descrição                                |
| :-------- | :----- | :--------------------------------------- |
| `body`    | `json` | **Obrigatório**. Dados da nova permissão |
