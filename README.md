# Desafio Técnico - Aplicativo de Gerenciamento de Tarefas (Back-End)

## Introdução

Este repositório contém a minha solução para o desafio técnico de desenvolvimento Full Stack. O objetivo foi construir um aplicativo de gerenciamento de tarefas utilizando as tecnologias especificadas.

## Tecnologias Utilizadas

### Backend:

- Node.js
- Express
- PostgreSQL
- TypeScript

## Funcionalidades Implementadas

### Autenticação

- Signin e Login com JWT
- Proteção de rotas autenticadas

### Gerenciamento de Tarefas

- Criar, editar e excluir tarefas
- Listar todas as tarefas do usuário

## Como Executar o Projeto

### Executando SEM Docker

#### Backend

1. Clone o repositório e entre na pasta do backend:
   ```sh
   git clone https://github.com/lucasmartins96/desafio-tecnico-chromasoft-be.git
   cd desafio-tecnico-chromasoft-be
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente (.env):
   ```
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=usuario_banco
   DB_PASSWORD=senha_banco
   DB_NAME=nome_banco
   SECRET_KEY_JWT=minha_chave_secreta
   ```
4. Crie o banco de dados e as tabelas (caso não tenha criado):
   ```sh
   npm run db:create
   ```
5. Rode as migrações do banco de dados:
   ```sh
   npm run migrate:dev
   ```
6. Inicie o servidor:
   ```sh
   npm run start:dev
   ```

### Executando COM Docker

1. Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina.
2. Clone o repositório e entre na pasta do projeto:
   ```sh
   git clone https://github.com/lucasmartins96/desafio-tecnico-chromasoft-be.git
   cd desafio-tecnico-chromasoft-be
   ```
3. Configure as variáveis de ambiente nos arquivos `.env` para backend e frontend.
   Copie as variáveis configuradas na seção de _Execução SEM docker_. Ao configurar o `DB_HOST`, atente-se para alterar para `postgres`
   ```
     DB_HOST=postgres # alterar para "postgres"
   ```
4. Execute o comando para subir os containers:
   ```sh
   docker-compose up --build
   ```
5. O backend estará disponível em `http://localhost:3000`.
6. Para parar os containers, utilize:
   ```sh
   docker-compose down
   ```

## Decisões de Implementação

- **Organização do Código**: Estruturei o backend utilizando padrão Model Service Controller para melhor separação de responsabilidades.
- **Utilização de Sequelize**: Escolhi Sequelize ORM para facilitar a interação com o PostgreSQL.

## Melhorias Futuras

- Implementação de testes automatizados.

## Conclusão

Este projeto foi desenvolvido como parte do desafio técnico para avaliar minhas habilidades em desenvolvimento Full Stack. Caso tenha alguma dúvida ou sugestão, fico à disposição!
