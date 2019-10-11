# Desafio Meetapp API

Durante esse desafio você dará início a um novo projeto no Bootcamp, esse projeto será desenvolvido aos poucos até o fim da sua jornada onde você terá uma aplicação completa envolvendo back-end, front-end e mobile.

## Aplicação

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app agregador de eventos para desenvolvedores chamado Meetapp (um acrônimo à Meetup + App).

## Parte 01 - Iniciando a aplicação

Crie um aplicação do zero utilizando Express.
Nessa aplicação configure as seguintes ferramentas:

- Sucrase + Nodemon
- ESLint + Prettier + EditorConfig
- Sequelize (Utilize PostgreSQL ou MySQL)

### Funcionalidades

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação.

#### Autenticação

Permita que um usuário se autentique em sua aplicação utilizando e-mail e senha.

- A autenticação deverá ser feita utilizando JWT
- Realize a validação dos dados de entrada

### Cadastro e atualização dos dados

Permita que novos usuários se cadastrem em sua aplicação utilizando nome, e-mail e senha.

Para atualizar a senha, o usuário deve também enviar um campo de confirmação com a mesma senha.

- Criptografe a senha do usuário para segurança
- Realize a validação dos dados de entrada
