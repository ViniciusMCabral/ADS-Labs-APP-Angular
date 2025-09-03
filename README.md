🍽️  Gerenciamento de restaurante

📖 Visão Geral

Desenvolvimento de um projeto full-stack para gerenciamento de restaurantes, com Node.js no backend, com operações CRUD para clientes, pratos e pedidos, além de relatórios. Frontend em Angular para interação com o usuário e aplicação orquestrada em Docker.

✨ Funcionalidades

Gestão de Clientes:

- Criar um novo cliente.

- Listar todos os clientes.

- Atualiza um cliente existente pelo ID.

- Remove um cliente pelo ID.

Gestão de Cardápio (Pratos):

- Cria um novo prato.

- Lista todos os pratos.

- Atualiza um prato existente pelo ID.

- Remove um prato pelo ID.

Gestão de Pedidos:

- Cria um novo pedido.

- Lista todos os pedidos.

- Atualiza um pedido existente pelo ID.

- Remove um pedido pelo ID.

Relatórios:

- 5 clientes com mais pedidos.

- 5 clientes que mais gastaram.

- Pratos mais pedidos.

🛠️ Tecnologias

Backend

- Node.js: Ambiente de execução JavaScript.

- Express.js: Framework para a construção da API RESTful.

- Sequelize: Para interação com o banco de dados.

- PostgreSQL: Banco de dados relacional para persistência dos dados.

Frontend

- Angular: Framework para a interação com o usuário.

- TypeScript: Adiciona tipagem estática.

DevOps

- Docker & Docker Compose: Para containerização e orquestração dos serviços (backend, frontend, banco de dados).

🚀 Como Executar o Projeto Localmente

Pré-requisitos

Antes de começar, você precisa ter as seguintes ferramentas instaladas:

- Node.js (versão 18 ou superior)

- Docker

- Git

Passo a Passo

Clone o repositório:
Bash

    git clone https://github.com/ViniciusMCabral/ADS-Labs-APP-Angular.git
    cd ADS-Labs-APP-Angular

Configure as Variáveis de Ambiente:

Edite o arquivo .env de acordo com suas configurações do banco.

Inicie a Aplicação com Docker Compose:
Na raiz do projeto, execute o seguinte comando. O --build é importante na primeira vez para construir as imagens Docker.
Bash

    docker-compose up --build

Acesse a Aplicação:

- Frontend (Angular): http://localhost:4200

- Backend (NodeJS API): http://localhost:3000/api