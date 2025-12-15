# Johnson & Johnson - Portal de Funcionários

[English](#english) | [Português](#português)

---

## Português

### 📋 Sobre o Projeto

Portal de gestão de funcionários da Johnson & Johnson, desenvolvido como parte de um desafio fullstack. O sistema permite visualizar, criar, editar e gerenciar funcionários através de uma interface moderna com suporte a múltiplos idiomas (PT-BR e EN), autenticação JWT e proteções de segurança.

### 🔗 Aplicação Deployada

- **Frontend (Web):** [https://jj-employee-portal.netlify.app](https://jj-employee-portal.netlify.app)
- **API (Backend):** [https://jj-employee-api.railway.app](https://jj-employee-api.railway.app)
- **Documentação da API (Swagger):** [https://jj-employee-api.railway.app/api/docs](https://jj-employee-api.railway.app/api/docs)

### 🔐 Credenciais de Acesso

```
Usuário: admin
Senha: admin123
```

### 🏗️ Arquitetura

```
fullstack-challenge/
├── apps/
│   ├── api/                    # Backend NestJS + TypeORM + PostgreSQL
│   │   ├── src/
│   │   │   ├── auth/           # Autenticação JWT
│   │   │   ├── common/         # Utilitários (sanitização, pipes)
│   │   │   ├── employee/       # CRUD de funcionários
│   │   │   └── health/         # Health check
│   │   └── ...
│   └── web/                    # Frontend Next.js 16 + React 19 + TailwindCSS
│       ├── app/
│       │   ├── auth/           # Context de autenticação
│       │   ├── components/     # Componentes React
│       │   │   └── ui/         # Componentes UI reutilizáveis
│       │   ├── employees/      # Páginas de funcionários
│       │   ├── login/          # Página de login
│       │   ├── i18n/           # Internacionalização
│       │   └── services/       # Serviços de API
│       └── ...
└── turbo.json                  # Configuração do Turborepo
```

**Fluxo de Dados:**
1. O usuário acessa a aplicação e é redirecionado para o **login**
2. Após autenticação, o **Frontend** envia requisições com **token JWT** para a **API**
3. A **API** valida o token, processa as requisições e interage com o **PostgreSQL**
4. Os dados são retornados em JSON e renderizados com suporte a **i18n**

### 🚀 Como Executar Localmente

#### Pré-requisitos
- Node.js >= 18
- pnpm >= 9.0.0
- PostgreSQL (ou Docker)

#### Instalação

```bash
# Clone o repositório
git clone https://github.com/lrachadel/fullstack-challenge.git
cd fullstack-challenge

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp apps/api/.env.example apps/api/.env
# Edite o arquivo .env com suas configurações

# Execute em modo desenvolvimento (todos os apps)
pnpm dev

# Ou execute individualmente:
pnpm dev --filter=api   # Apenas API (porta 3002)
pnpm dev --filter=web   # Apenas Web (porta 3000)
```

#### Variáveis de Ambiente (API)

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

### 🛠️ Tecnologias Utilizadas

| Tecnologia | Motivo da Escolha |
|------------|-------------------|
| **Turborepo** | Monorepo com cache inteligente e builds paralelos |
| **Next.js 16** | Framework React com App Router e excelente DX |
| **React 19** | Última versão com melhorias de performance |
| **TailwindCSS 4** | Estilização utility-first com excelente produtividade |
| **NestJS 11** | Framework Node.js robusto com arquitetura modular e DI |
| **TypeORM** | ORM TypeScript-first com suporte a migrations |
| **PostgreSQL** | Banco relacional robusto e escalável |
| **Passport JWT** | Autenticação stateless com tokens JWT |
| **Helmet** | Headers de segurança HTTP |
| **Swagger** | Documentação automática da API |
| **pnpm** | Gerenciador de pacotes rápido e eficiente |

### 🤖 Uso de IA no Desenvolvimento

O desenvolvimento deste projeto contou com o auxílio de **Windsurf Cascade (Claude Sonnet 4)** como assistente de programação:

**Ferramentas Utilizadas:**
- **Windsurf IDE** com Cascade AI integrado

**Propósitos e Impacto:**
- **Scaffolding inicial:** Geração da estrutura base do monorepo
- **Implementação de features:** Componentes React, endpoints da API e lógica de negócio
- **Segurança:** Implementação de autenticação JWT, sanitização e proteções
- **Internacionalização:** Sistema de i18n com suporte a PT-BR e EN
- **Refatoração:** Melhoria da qualidade do código e organização
- **Documentação:** Criação de READMEs detalhados

**Impacto:** Estimativa de redução de ~40% no tempo de desenvolvimento.

### ✨ Features Implementadas

#### Features Base
- [x] Listagem de funcionários em tabela e cards
- [x] Visualização de organograma hierárquico
- [x] Detalhes do funcionário com informações completas
- [x] CRUD completo (Create, Read, Update, Delete)
- [x] API RESTful documentada com Swagger

#### Features Plus
- [x] **Internacionalização (i18n):** Suporte completo a PT-BR e EN
- [x] **Filtros avançados:** Por departamento, tipo e status
- [x] **Busca em tempo real:** Pesquisa por nome, cargo e email
- [x] **Design responsivo:** Funciona em desktop, tablet e mobile
- [x] **Validação de formulários:** Validação client-side e server-side
- [x] **Tratamento de erros:** Mensagens amigáveis e logging
- [x] **Fotos de funcionários:** Suporte a imagens de perfil
- [x] **Brand J&J:** Cores e estilos seguindo as diretrizes da marca

#### Features de Segurança
- [x] **Autenticação JWT:** Login com tokens JWT e proteção de rotas
- [x] **Validação de Input:** class-validator para validação de DTOs
- [x] **Proteção XSS:** Sanitização de inputs com sanitize-html
- [x] **SQL Injection:** Prevenção via queries parametrizadas do TypeORM
- [x] **Rate Limiting:** Limitação de requisições com @nestjs/throttler
- [x] **Helmet:** Headers de segurança HTTP
- [x] **CORS:** Configuração de origens permitidas
- [x] **Variáveis de Ambiente:** Configuração segura de credenciais

### 📡 Endpoints da API

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/auth/login` | Autenticação | ❌ |
| GET | `/employee` | Lista funcionários | ✅ |
| GET | `/employee/:id` | Busca por ID | ✅ |
| POST | `/employee/create-employee` | Cria funcionário | ✅ |
| PATCH | `/employee/update-employee/:id` | Atualiza funcionário | ✅ |
| DELETE | `/employee/delete-employee/:id` | Remove funcionário | ✅ |
| GET | `/health` | Health check | ❌ |

### ⚠️ Limitações e Problemas Conhecidos

1. **Upload de fotos:** As fotos são referenciadas por URL, não há upload direto
2. **Paginação:** A listagem não possui paginação server-side
3. **Testes:** Cobertura de testes unitários e E2E limitada
4. **Cache:** Não há estratégia de cache implementada no frontend
5. **Usuários:** Sistema com usuário admin único (sem cadastro de usuários)

---

## English

### 📋 About the Project

Johnson & Johnson Employee Management Portal, developed as part of a fullstack challenge. The system allows viewing, creating, editing, and managing employees through a modern interface with multi-language support (PT-BR and EN), JWT authentication, and security protections.

### 🔗 Deployed Application

- **Frontend (Web):** [https://jj-employee-portal.netlify.app](https://jj-employee-portal.netlify.app)
- **API (Backend):** [https://jj-employee-api.railway.app](https://jj-employee-api.railway.app)
- **API Documentation (Swagger):** [https://jj-employee-api.railway.app/api/docs](https://jj-employee-api.railway.app/api/docs)

### 🔐 Access Credentials

```
Username: admin
Password: admin123
```

### 🏗️ Architecture

```
fullstack-challenge/
├── apps/
│   ├── api/                    # Backend NestJS + TypeORM + PostgreSQL
│   │   ├── src/
│   │   │   ├── auth/           # JWT Authentication
│   │   │   ├── common/         # Utilities (sanitization, pipes)
│   │   │   ├── employee/       # Employee CRUD
│   │   │   └── health/         # Health check
│   │   └── ...
│   └── web/                    # Frontend Next.js 16 + React 19 + TailwindCSS
│       ├── app/
│       │   ├── auth/           # Authentication context
│       │   ├── components/     # React components
│       │   │   └── ui/         # Reusable UI components
│       │   ├── employees/      # Employee pages
│       │   ├── login/          # Login page
│       │   ├── i18n/           # Internationalization
│       │   └── services/       # API services
│       └── ...
└── turbo.json                  # Turborepo configuration
```

**Data Flow:**
1. User accesses the application and is redirected to **login**
2. After authentication, the **Frontend** sends requests with **JWT token** to the **API**
3. The **API** validates the token, processes requests, and interacts with **PostgreSQL**
4. Data is returned in JSON and rendered with **i18n** support

### 🚀 How to Run Locally

#### Prerequisites
- Node.js >= 18
- pnpm >= 9.0.0
- PostgreSQL (or Docker)

#### Installation

```bash
# Clone the repository
git clone https://github.com/lrachadel/fullstack-challenge.git
cd fullstack-challenge

# Install dependencies
pnpm install

# Configure environment variables
cp apps/api/.env.example apps/api/.env
# Edit the .env file with your settings

# Run in development mode (all apps)
pnpm dev

# Or run individually:
pnpm dev --filter=api   # API only (port 3002)
pnpm dev --filter=web   # Web only (port 3000)
```

#### Environment Variables (API)

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

### 🛠️ Technologies Used

| Technology | Reason for Choice |
|------------|-------------------|
| **Turborepo** | Monorepo with smart caching and parallel builds |
| **Next.js 16** | React framework with App Router and excellent DX |
| **React 19** | Latest version with performance improvements |
| **TailwindCSS 4** | Utility-first styling with excellent productivity |
| **NestJS 11** | Robust Node.js framework with modular architecture and DI |
| **TypeORM** | TypeScript-first ORM with migrations support |
| **PostgreSQL** | Robust and scalable relational database |
| **Passport JWT** | Stateless authentication with JWT tokens |
| **Helmet** | HTTP security headers |
| **Swagger** | Automatic API documentation |
| **pnpm** | Fast and space-efficient package manager |

### 🤖 AI Usage in Development

This project was developed with the assistance of **Windsurf Cascade (Claude Sonnet 4)** as a programming assistant:

**Tools Used:**
- **Windsurf IDE** with integrated Cascade AI

**Purposes and Impact:**
- **Initial scaffolding:** Generation of monorepo base structure
- **Feature implementation:** React components, API endpoints, and business logic
- **Security:** JWT authentication, sanitization, and protections implementation
- **Internationalization:** i18n system with PT-BR and EN support
- **Refactoring:** Code quality improvement and organization
- **Documentation:** Creation of detailed READMEs

**Impact:** Estimated ~40% reduction in development time.

### ✨ Implemented Features

#### Base Features
- [x] Employee listing in table and cards
- [x] Hierarchical org chart visualization
- [x] Employee details with complete information
- [x] Full CRUD (Create, Read, Update, Delete)
- [x] RESTful API documented with Swagger

#### Plus Features
- [x] **Internationalization (i18n):** Full support for PT-BR and EN
- [x] **Advanced filters:** By department, type, and status
- [x] **Real-time search:** Search by name, job title, and email
- [x] **Responsive design:** Works on desktop, tablet, and mobile
- [x] **Form validation:** Client-side and server-side validation
- [x] **Error handling:** User-friendly messages and logging
- [x] **Employee photos:** Profile image support
- [x] **J&J Brand:** Colors and styles following brand guidelines

#### Security Features
- [x] **JWT Authentication:** Login with JWT tokens and route protection
- [x] **Input Validation:** class-validator for DTO validation
- [x] **XSS Protection:** Input sanitization with sanitize-html
- [x] **SQL Injection:** Prevention via TypeORM parameterized queries
- [x] **Rate Limiting:** Request limiting with @nestjs/throttler
- [x] **Helmet:** HTTP security headers
- [x] **CORS:** Allowed origins configuration
- [x] **Environment Variables:** Secure credential configuration

### 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/login` | Authentication | ❌ |
| GET | `/employee` | List employees | ✅ |
| GET | `/employee/:id` | Get by ID | ✅ |
| POST | `/employee/create-employee` | Create employee | ✅ |
| PATCH | `/employee/update-employee/:id` | Update employee | ✅ |
| DELETE | `/employee/delete-employee/:id` | Remove employee | ✅ |
| GET | `/health` | Health check | ❌ |

### ⚠️ Limitations and Known Issues

1. **Photo upload:** Photos are referenced by URL, no direct upload
2. **Pagination:** Listing does not have server-side pagination
3. **Tests:** Limited unit and E2E test coverage
4. **Cache:** No caching strategy implemented on the frontend
5. **Users:** Single admin user system (no user registration)
