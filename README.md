# Desafio Meetapp API

Durante esse desafio você dará início a um novo projeto no Bootcamp, esse projeto será desenvolvido aos poucos até o fim da sua jornada onde você terá uma aplicação completa envolvendo back-end, front-end e mobile.

## Aplicação

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app agregador de eventos para desenvolvedores chamado Meetapp (um acrônimo à Meetup + App).

Crie um aplicação do zero utilizando Express.
Nessa aplicação configure as seguintes ferramentas:

- Sucrase + Nodemon
- ESLint + Prettier + EditorConfig
- Sequelize (Utilize PostgreSQL ou MySQL)

## Funcionalidades

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação.

### [DONE] Autenticação

Permita que um usuário se autentique em sua aplicação utilizando e-mail e senha.

- A autenticação deverá ser feita utilizando JWT
- Realize a validação dos dados de entrada

### [DONE] Cadastro e atualização dos dados

Permita que novos usuários se cadastrem em sua aplicação utilizando nome, e-mail e senha.

Para atualizar a senha, o usuário deve também enviar um campo de confirmação com a mesma senha.

- Criptografe a senha do usuário para segurança
- Realize a validação dos dados de entrada

### [DONE] Gerenciamento de Arquivos

Crie uma rota para upload de arquivos que cadastra em uma tabela o caminho e o nome do arquivo e retorna todos os dados do arquivo cadastrado.

### [DOING] Gerenciamento de Meetups

[DONE] O usuário pode cadastrar meetups na plataforma com título do meetup, descrição, localização, data e hora e imagem (banner). Todos os campos são obrigatórios. Adicione também um campo `user_id` que armazena o `id` do usuário que organiza o evento.

Não deve ser possível cadastrar meetups com datas que já passaram.

O usuário também deve poder editar todos os dados de meetups que ainda não aconteceram, e que ele é organizador.

Crie uma rota para listar os meetups que são organizados pelo usuário logado.

O usuário deve poder cancelar meetups organizados por ele e que ainda não aconteceram. O cancelamento deve deletar o meetup da base de dados.

### [TODO] Inscrição no Meetup

O usuário deve poder se inscrever em meetups que não organiza.

O usuário não pode se inscrever em meetups que já aconteceram.

O usuário não pode se inscrever no mesmo meetup duas vezes.

O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.

Sempre que em um usuário se inscrever no meetup, envie um email ao organizador contendo os dados relacionados ao usuário inscrito. O template de email fica por sua conta.

### [TODO] Listagem de Meetups

Crie uma rota para listar os meetups com filtro por data (não por hora), os resultados dessa listagem devem vir paginados em 10 itens por página. Abaixo tem um exemplo de chamada para a rota de listagem dos meetups:

```
http://localhost:3000/meetups?date=2019-11-01&page=2
```

Nesse exemplo, listaremos a página 2 dos meetups que acontecerão no dia 01 de Novembro.

Nessa listagem retorne também os dados do organizador.

### [TODO] Listagem de Inscrições

Crie uma rota para listar os meetups em que o usuário logado está inscrito.

Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.
