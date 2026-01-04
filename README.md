# 📌 TaskFlow API

API RESTful para gerenciamento de tarefas, com autenticação JWT, controle de ownership, soft delete e paginação.  
Projeto desenvolvido com foco em **boas práticas de backend**, arquitetura limpa e padrão de produção.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- ES Modules
- Dotenv

---

## 🧠 Conceitos Aplicados

- Arquitetura em camadas (Controller / Service / Middleware)
- Autenticação e autorização com JWT
- Ownership (usuário só acessa seus próprios recursos)
- Soft delete
- Paginação e filtros
- Erros padronizados (HTTP status codes corretos)
- Prisma Enums e migrations
- Boas práticas RESTful

---

## 📁 Estrutura do Projeto

```text
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
```

---

## 🔐 Autenticação
A API utiliza JWT para autenticação.

Após o login, o token deve ser enviado em todas as rotas protegidas via header:

```http
Authorization: Bearer <token>
```

---

## 📌 Endpoints
### Modulo Auth
#### Register (Criar usuário)
    POST /auth/register

**Body**
```json
{
  "nome": "Fabricio",
  "email": "fabricio@email.com",
  "senha": "12345678"
}
```

**Response**
```json
{
  "id": 1,
  "nome": "Fabricio",
  "email": "fabricio@email.com"
}
```

---

#### Login

    POST /auth/login

**Body**
```json
{
  "email": "fabricio@email.com",
  "senha": "12345678"
}
```

**Response**
```json
{
  "token": "jwt_token_aqui"
}
```

---

### Módulo Tasks (rotas protegidas)

Todas as rotas abaixo exigem o header:
```makerfile
Authorization: Bearer <token>
```

---

#### Criar tarefa

    POST /tasks

**Body**
```json
{
  "titulo": "Estudar Prisma",
  "descricao": "Revisar enums e migrations",
  "prioridade": "ALTA",
  "dataLimite": "2026-01-15T18:00:00Z"
}
```

**Response**
```json
{
  "id": 1,
  "titulo": "Estudar Prisma",
  "status": "PENDENTE",
  "prioridade": "ALTA"
}
```

---

### Listar tarefas (com paginação e filtros)

    GET /tasks?page=1&limit=10&status=PENDENTE&prioridade=ALTA

**Response**
```json
{
  "page": 1,
  "limit": 10,
  "total": 5,
  "totalPages": 1,
  "items": []
}
```

---

### Buscar tarefa por ID

    GET /tasks/:id

**Response**
```json
{
  "id": 1,
  "titulo": "Estudar Prisma",
  "descricao": "Revisar enums e migrations",
  "status": "PENDENTE",
  "prioridade": "ALTA",
  "dataLimite": "2026-01-15T18:00:00Z"
}
```

---

### Atualizar tarefa

    PUT /tasks/:id

**Body**
```json
{
  "titulo": "Atualizar tarefa",
  "status": "EM_ANDAMENTO"
}
```

**Regras**

* Apenas o dono pode alterar

* Tarefas com status CONCLUIDA não podem ser modificadas

---

### Deletar tarefa (soft delete)

    DELETE /tasks/:id

**Response**
```http
204 No Content
```

---

## ⚙️ Como Rodar o Projeto Localmente
### 1️⃣ Clonar o repositório
```bash
git clone <url-do-repositorio>
cd taskflow-api
```

---


### 2️⃣ Instalar dependências
```bash
npm install
```

---

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo .env baseado no .env.example:
```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=sua_chave_secreta
PORT=3000
```

---

### 4️⃣ Rodar migrations
```bash
npx prisma migrate dev
```

---

### 5️⃣ Iniciar a aplicação
```bash
npm run dev
```

---

## 🧪 Testes Manuais

A API pode ser testada utilizando:

* Insomnia

* Postman

* Hoppscotch Desktop

---


## 📄 Licença

Este projeto utiliza a licença MIT.

---

## 👨‍💻 Autor

Fabricio Souza
Backend Developer