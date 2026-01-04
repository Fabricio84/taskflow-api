📌 TaskFlow API

API RESTful para gerenciamento de tarefas, com autenticação JWT, controle de ownership, soft delete e paginação.
Projeto desenvolvido com foco em boas práticas de backend, arquitetura limpa e padrão de produção.

🚀 Tecnologias Utilizadas

Node.js

Express

Prisma ORM

PostgreSQL (Prisma Postgres / compatível com qualquer Postgres)

JWT (JSON Web Token)

ES Modules

Dotenv

🧠 Conceitos Aplicados

Arquitetura em camadas (Controller / Service / Middleware)

Autenticação e autorização com JWT

Ownership (usuário só acessa seus próprios recursos)

Soft delete

Paginação e filtros

Erros padronizados (HTTP status codes corretos)

Prisma Enums e migrations

Boas práticas RESTful

📁 Estrutura do Projeto

src/
├── config/
│   └── prisma.js
├── errors/
├── middlewares/
├── modules/
│   ├── auth/
│   └── task/
├── app.js
└── server.js

🔐 Autenticação

A API utiliza JWT para autenticação.

Após o login, o token deve ser enviado em todas as rotas protegidas via header:

Authorization: Bearer <token>

📌 Endpoints
🔹 Auth

    Register
    POST /auth/register
    Body:
    {
    "nome": "Fabricio",
    "email": "fabricio@email.com",
    "senha": "12345678"
    }
    Response:
    {
    "id": 1,
    "nome": "Fabricio",
    "email": "fabricio@email.com"
    }

    Login
    POST /auth/login


    Body:

    {
    "email": "fabricio@email.com",
    "senha": "12345678"
    }


    Response:

    {
    "token": "jwt_token_aqui"
    }

    🔹 Tasks (rotas protegidas)
    Criar tarefa
    POST /tasks


    Body:

    {
    "titulo": "Estudar Prisma",
    "descricao": "Revisar enums e migrations",
    "prioridade": "ALTA",
    "dataLimite": "2026-01-15T18:00:00Z"
    }


    Response:

    {
    "id": 1,
    "titulo": "Estudar Prisma",
    "status": "PENDENTE",
    "prioridade": "ALTA"
    }

    Listar tarefas (com paginação)
    GET /tasks?page=1&limit=10&status=PENDENTE&prioridade=ALTA


    Response:

    {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1,
    "items": []
    }

    Buscar tarefa por ID
    GET /tasks/:id

    Atualizar tarefa
    PUT /tasks/:id


    Regras:

    Apenas o dono pode alterar

    Tarefas com status CONCLUIDA não podem ser modificadas

    Deletar tarefa (soft delete)
    DELETE /tasks/:id


    Response:

    204 No Content

    ⚠️ Regras de Negócio Importantes

    Usuário só pode acessar suas próprias tarefas

    Exclusão é lógica (ativo = false)

    Tarefas concluídas são imutáveis

    Status e prioridade são controlados por enums

    IDs inválidos retornam erro apropriado

    ❗ Padronização de Erros

    Formato padrão de erro:

    {
        "error": {
            "code": "NOT_FOUND",
            "message": "Task not found"
        }
    }

    Principais status codes:

    400 Bad Request

    401 Unauthorized

    403 Forbidden

    404 Not Found

    409 Conflict

    500 Internal Server Error

⚙️ Como Rodar o Projeto Localmente
1️⃣ Clonar o repositório
git clone <url-do-repositorio>
cd taskflow-api

2️⃣ Instalar dependências
npm install

3️⃣ Configurar variáveis de ambiente

Crie um arquivo .env baseado no .env.example:

DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=sua_chave_secreta
PORT=3000

4️⃣ Rodar migrations
npx prisma migrate dev

5️⃣ Iniciar a aplicação
npm run dev

🧪 Testes Manuais

A API pode ser testada utilizando:

Insomnia

Postman

Hoppscotch Desktop

📄 Licença

Este projeto utiliza a licença MIT.

👨‍💻 Autor

Fabricio Oliveira de Souza
Backend Developer
Projeto desenvolvido para portfólio e estudos avançados em backend.
