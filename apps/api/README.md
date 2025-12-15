# API - Portal de Funcionários

[English](#english) | [Português](#português)

---

## Português

### 📋 Sobre

API RESTful para o Portal de Funcionários da Johnson & Johnson. Desenvolvida com NestJS, TypeORM e PostgreSQL, fornece endpoints para gerenciamento completo de funcionários com autenticação JWT e proteções de segurança.

### 🔗 URL de Produção

- **API:** [https://jj-employee-api.railway.app](https://jj-employee-api.railway.app)
- **Swagger:** [https://jj-employee-api.railway.app/api/docs](https://jj-employee-api.railway.app/api/docs)

### 🏗️ Arquitetura

```
apps/api/
├── src/
│   ├── auth/               # Módulo de autenticação
│   │   ├── decorators/     # @Public, @Roles, @CurrentUser
│   │   ├── guards/         # JWT Guard, Roles Guard
│   │   ├── strategies/     # JWT Strategy
│   │   ├── dto/            # Login DTO
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── common/             # Utilitários compartilhados
│   │   ├── decorators/     # @Sanitize
│   │   ├── pipes/          # SanitizePipe
│   │   └── utils/          # sanitize.util.ts
│   ├── employee/           # Módulo de funcionários
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entities/       # Entidades TypeORM
│   │   ├── employee.controller.ts
│   │   ├── employee.service.ts
│   │   └── employee.module.ts
│   ├── health/             # Health check endpoint
│   ├── app.module.ts       # Módulo principal
│   ├── config.service.ts   # Configurações centralizadas
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
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha
POSTGRES_DATABASE=employees

# Application
MODE=DEV
PORT=3002

# JWT Authentication
JWT_SECRET=sua-chave-secreta-jwt
JWT_EXPIRES_IN=1d

# Admin User
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$... # Hash bcrypt da senha

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_TTL=60000
RATE_LIMIT_MAX=100
```

### 🔐 Segurança

A API implementa várias camadas de segurança:

| Feature | Descrição |
|---------|-----------|
| **Autenticação JWT** | Tokens JWT para autenticação de usuários |
| **Validação de Input** | class-validator para validação de DTOs |
| **Proteção XSS** | Sanitização de inputs com sanitize-html |
| **SQL Injection** | Prevenção via queries parametrizadas do TypeORM |
| **Rate Limiting** | Limitação de requisições com @nestjs/throttler |
| **Helmet** | Headers de segurança HTTP |
| **CORS** | Configuração de origens permitidas |

### 📡 Endpoints da API

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/auth/login` | Autenticação | ❌ |
| GET | `/employee` | Lista todos os funcionários | ✅ |
| GET | `/employee/:id` | Busca funcionário por ID | ✅ |
| POST | `/employee/create-employee` | Cria novo funcionário | ✅ |
| PATCH | `/employee/update-employee/:id` | Atualiza funcionário | ✅ |
| DELETE | `/employee/delete-employee/:id` | Remove funcionário (soft delete) | ✅ |
| GET | `/health` | Health check | ❌ |

### 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **NestJS** | 11.x | Framework Node.js com arquitetura modular |
| **TypeORM** | 0.3.x | ORM para PostgreSQL |
| **PostgreSQL** | 15+ | Banco de dados relacional |
| **Passport JWT** | 5.x | Autenticação JWT |
| **Helmet** | 8.x | Headers de segurança |
| **@nestjs/throttler** | 6.x | Rate limiting |
| **sanitize-html** | 2.x | Proteção XSS |
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

### 🤖 Uso de IA no Desenvolvimento

Este módulo foi desenvolvido com auxílio de **Windsurf Cascade (Claude Sonnet 4)**:

**Propósitos:**
- **Arquitetura:** Estrutura modular NestJS com guards, decorators e pipes
- **Segurança:** Implementação de JWT, sanitização XSS e rate limiting
- **TypeORM:** Entidades, repositórios e queries tipadas
- **Validação:** DTOs com class-validator e class-transformer
- **Correção de lint:** Resolução de erros de tipagem TypeScript

**Impacto:** Aceleração significativa no desenvolvimento de features de segurança e configuração.

### ⚠️ Limitações

- Sem paginação server-side
- Soft delete apenas (não remove fisicamente)
- Usuário admin único (sem cadastro de usuários)

---

## English

### 📋 About

RESTful API for the Johnson & Johnson Employee Portal. Built with NestJS, TypeORM, and PostgreSQL, it provides endpoints for complete employee management with JWT authentication and security protections.

### 🔗 Production URL

- **API:** [https://jj-employee-api.railway.app](https://jj-employee-api.railway.app)
- **Swagger:** [https://jj-employee-api.railway.app/api/docs](https://jj-employee-api.railway.app/api/docs)

### 🏗️ Architecture

```
apps/api/
├── src/
│   ├── auth/               # Authentication module
│   │   ├── decorators/     # @Public, @Roles, @CurrentUser
│   │   ├── guards/         # JWT Guard, Roles Guard
│   │   ├── strategies/     # JWT Strategy
│   │   ├── dto/            # Login DTO
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── common/             # Shared utilities
│   │   ├── decorators/     # @Sanitize
│   │   ├── pipes/          # SanitizePipe
│   │   └── utils/          # sanitize.util.ts
│   ├── employee/           # Employee module
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entities/       # TypeORM entities
│   │   ├── employee.controller.ts
│   │   ├── employee.service.ts
│   │   └── employee.module.ts
│   ├── health/             # Health check endpoint
│   ├── app.module.ts       # Main module
│   ├── config.service.ts   # Centralized configuration
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
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=employees

# Application
MODE=DEV
PORT=3002

# JWT Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=1d

# Admin User
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$10$... # bcrypt hash of password

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Rate Limiting
RATE_LIMIT_TTL=60000
RATE_LIMIT_MAX=100
```

### 🔐 Security

The API implements multiple security layers:

| Feature | Description |
|---------|-------------|
| **JWT Authentication** | JWT tokens for user authentication |
| **Input Validation** | class-validator for DTO validation |
| **XSS Protection** | Input sanitization with sanitize-html |
| **SQL Injection** | Prevention via TypeORM parameterized queries |
| **Rate Limiting** | Request limiting with @nestjs/throttler |
| **Helmet** | HTTP security headers |
| **CORS** | Allowed origins configuration |

### 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | Authentication | ❌ |
| GET | `/employee` | List all employees | ✅ |
| GET | `/employee/:id` | Get employee by ID | ✅ |
| POST | `/employee/create-employee` | Create new employee | ✅ |
| PATCH | `/employee/update-employee/:id` | Update employee | ✅ |
| DELETE | `/employee/delete-employee/:id` | Remove employee (soft delete) | ✅ |
| GET | `/health` | Health check | ❌ |

### 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **NestJS** | 11.x | Node.js framework with modular architecture |
| **TypeORM** | 0.3.x | ORM for PostgreSQL |
| **PostgreSQL** | 15+ | Relational database |
| **Passport JWT** | 5.x | JWT authentication |
| **Helmet** | 8.x | Security headers |
| **@nestjs/throttler** | 6.x | Rate limiting |
| **sanitize-html** | 2.x | XSS protection |
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

### 🤖 AI Usage in Development

This module was developed with the assistance of **Windsurf Cascade (Claude Sonnet 4)**:

**Purposes:**
- **Architecture:** Modular NestJS structure with guards, decorators, and pipes
- **Security:** JWT implementation, XSS sanitization, and rate limiting
- **TypeORM:** Entities, repositories, and typed queries
- **Validation:** DTOs with class-validator and class-transformer
- **Lint fixes:** TypeScript typing error resolution

**Impact:** Significant acceleration in security features and configuration development.

### ⚠️ Limitations

- No server-side pagination
- Soft delete only (no physical removal)
- Single admin user (no user registration)
