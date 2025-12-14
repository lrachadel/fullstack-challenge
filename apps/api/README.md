# API - Portal de Funcionários

[English](#english) | [Português](#português)

---

## Português

### 📋 Sobre

API RESTful para o Portal de Funcionários da Johnson & Johnson. Desenvolvida com NestJS, TypeORM e PostgreSQL, fornece endpoints para gerenciamento completo de funcionários.

### 🔗 URL de Produção

- **API:** [https://jj-employee-api.railway.app](https://jj-employee-api.railway.app)
- **Swagger:** [https://jj-employee-api.railway.app/api](https://jj-employee-api.railway.app/api)

### 🏗️ Arquitetura

```
apps/api/
├── src/
│   ├── employee/           # Módulo de funcionários
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entities/       # Entidades TypeORM
│   │   ├── employee.controller.ts
│   │   ├── employee.service.ts
│   │   └── employee.module.ts
│   ├── health/             # Health check endpoint
│   ├── app.module.ts       # Módulo principal
│   └── main.ts             # Bootstrap da aplicação
├── assets/                 # Dados de seed (JSON)
└── test/                   # Testes E2E
```

### 🚀 Como Executar

#### Pré-requisitos
- Node.js >= 18
- pnpm >= 9.0.0
- PostgreSQL

#### Instalação

```bash
# A partir da raiz do monorepo
cd apps/api

# Instale as dependências (se não instalou na raiz)
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute em modo desenvolvimento
pnpm dev
```

#### Variáveis de Ambiente

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=employees
NODE_ENV=development
PORT=3001
```

### 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/employees` | Lista todos os funcionários |
| GET | `/employees/:id` | Busca funcionário por ID |
| POST | `/employees` | Cria novo funcionário |
| PATCH | `/employees/:id` | Atualiza funcionário |
| DELETE | `/employees/:id` | Remove funcionário (soft delete) |
| GET | `/health` | Health check |

### 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **NestJS** | 11.x | Framework Node.js com arquitetura modular |
| **TypeORM** | 0.3.x | ORM para PostgreSQL |
| **PostgreSQL** | 15+ | Banco de dados relacional |
| **Swagger** | 11.x | Documentação automática da API |
| **class-validator** | 0.14.x | Validação de DTOs |
| **class-transformer** | 0.5.x | Transformação de objetos |

### 🧪 Testes

```bash
# Testes unitários
pnpm test

# Testes E2E
pnpm test:e2e

# Cobertura de testes
pnpm test:cov
```

### ⚠️ Limitações

- Sem autenticação/autorização
- Sem rate limiting
- Sem paginação server-side
- Soft delete apenas (não remove fisicamente)

---

## English

### 📋 About

RESTful API for the Johnson & Johnson Employee Portal. Built with NestJS, TypeORM, and PostgreSQL, it provides endpoints for complete employee management.

### 🔗 Production URL

- **API:** [https://jj-employee-api.railway.app](https://jj-employee-api.railway.app)
- **Swagger:** [https://jj-employee-api.railway.app/api](https://jj-employee-api.railway.app/api)

### 🏗️ Architecture

```
apps/api/
├── src/
│   ├── employee/           # Employee module
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entities/       # TypeORM entities
│   │   ├── employee.controller.ts
│   │   ├── employee.service.ts
│   │   └── employee.module.ts
│   ├── health/             # Health check endpoint
│   ├── app.module.ts       # Main module
│   └── main.ts             # Application bootstrap
├── assets/                 # Seed data (JSON)
└── test/                   # E2E tests
```

### 🚀 How to Run

#### Prerequisites
- Node.js >= 18
- pnpm >= 9.0.0
- PostgreSQL

#### Installation

```bash
# From the monorepo root
cd apps/api

# Install dependencies (if not installed at root)
pnpm install

# Configure environment variables
cp .env.example .env

# Run in development mode
pnpm dev
```

#### Environment Variables

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=employees
NODE_ENV=development
PORT=3001
```

### 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees` | List all employees |
| GET | `/employees/:id` | Get employee by ID |
| POST | `/employees` | Create new employee |
| PATCH | `/employees/:id` | Update employee |
| DELETE | `/employees/:id` | Remove employee (soft delete) |
| GET | `/health` | Health check |

### 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | 11.x | Node.js framework with modular architecture |
| **TypeORM** | 0.3.x | ORM for PostgreSQL |
| **PostgreSQL** | 15+ | Relational database |
| **Swagger** | 11.x | Automatic API documentation |
| **class-validator** | 0.14.x | DTO validation |
| **class-transformer** | 0.5.x | Object transformation |

### 🧪 Tests

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

### ⚠️ Limitations

- No authentication/authorization
- No rate limiting
- No server-side pagination
- Soft delete only (no physical removal)
