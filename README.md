# Johnson & Johnson - Portal de Funcionários

[English](#english) | [Português](#português)

---

## Português

### 📋 Sobre o Projeto

Portal de gestão de funcionários da Johnson & Johnson, desenvolvido como parte de um desafio fullstack. O sistema permite visualizar, criar, editar e gerenciar funcionários através de uma interface moderna com suporte a múltiplos idiomas (PT-BR e EN).

### 🔗 Aplicação Deployada

- **Frontend (Web):** [https://jj-employee-portal.netlify.app](https://jj-employee-portal.netlify.app)
- **API (Backend):** [https://jj-employee-api.railway.app](https://jj-employee-api.railway.app)
- **Documentação da API (Swagger):** [https://jj-employee-api.railway.app/api](https://jj-employee-api.railway.app/api)

### 🏗️ Arquitetura

```
fullstack-challenge/
├── apps/
│   ├── api/          # Backend NestJS + TypeORM + PostgreSQL
│   └── web/          # Frontend Next.js 16 + React 19 + TailwindCSS
├── packages/
│   ├── ui/           # Componentes React compartilhados
│   ├── eslint-config/# Configurações ESLint
│   └── typescript-config/ # Configurações TypeScript
└── turbo.json        # Configuração do Turborepo
```

**Fluxo de Dados:**
1. O **Frontend (Next.js)** faz requisições HTTP para a **API (NestJS)**
2. A **API** processa as requisições e interage com o **PostgreSQL** via TypeORM
3. Os dados são retornados em formato JSON para o frontend
4. O frontend renderiza os dados com suporte a internacionalização (i18n)

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
# Edite o arquivo .env com suas configurações de banco de dados

# Execute em modo desenvolvimento (todos os apps)
pnpm dev

# Ou execute individualmente:
pnpm dev --filter=api   # Apenas API (porta 3001)
pnpm dev --filter=web   # Apenas Web (porta 3000)
```

#### Variáveis de Ambiente (API)

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=employees
NODE_ENV=development
```

### 🛠️ Tecnologias Utilizadas

| Tecnologia | Motivo da Escolha |
|------------|-------------------|
| **Turborepo** | Monorepo com cache inteligente, builds paralelos e gerenciamento eficiente de dependências |
| **Next.js 16** | Framework React com SSR/SSG, App Router e excelente DX |
| **React 19** | Última versão com melhorias de performance e novos hooks |
| **TailwindCSS 4** | Estilização utility-first com excelente produtividade |
| **NestJS 11** | Framework Node.js robusto com arquitetura modular, DI e decorators |
| **TypeORM** | ORM TypeScript-first com suporte a migrations e relações |
| **PostgreSQL** | Banco relacional robusto e escalável |
| **Swagger** | Documentação automática da API |
| **pnpm** | Gerenciador de pacotes rápido e eficiente em espaço |

### 🤖 Uso de IA no Desenvolvimento

O desenvolvimento deste projeto contou com o auxílio de **Windsurf Cascade (Claude Sonnet 4)** como assistente de programação:

**Ferramentas Utilizadas:**
- **Windsurf IDE** com Cascade AI integrado

**Propósitos e Impacto:**
- **Scaffolding inicial:** Geração da estrutura base do monorepo e configurações
- **Implementação de features:** Auxílio na criação de componentes React, endpoints da API e lógica de negócio
- **Debugging:** Identificação e correção de bugs complexos
- **Internacionalização:** Implementação do sistema de i18n com suporte a PT-BR e EN
- **Refatoração:** Melhoria da qualidade do código e organização
- **Documentação:** Criação de READMEs e comentários

**Impacto:** A IA acelerou significativamente o desenvolvimento, permitindo foco em decisões arquiteturais e UX enquanto tarefas repetitivas eram automatizadas. Estimativa de redução de ~40% no tempo de desenvolvimento.

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

### ⚠️ Limitações e Problemas Conhecidos

1. **Autenticação:** O sistema não possui autenticação/autorização implementada
2. **Upload de fotos:** As fotos são referenciadas por URL, não há upload direto
3. **Paginação:** A listagem não possui paginação server-side (carrega todos os registros)
4. **Testes:** Cobertura de testes unitários e E2E limitada
5. **Cache:** Não há estratégia de cache implementada no frontend

---

## English

### 📋 About the Project

Johnson & Johnson Employee Management Portal, developed as part of a fullstack challenge. The system allows viewing, creating, editing, and managing employees through a modern interface with multi-language support (PT-BR and EN).

### 🔗 Deployed Application

- **Frontend (Web):** [https://jj-employee-portal.netlify.app](https://jj-employee-portal.netlify.app)
- **API (Backend):** [https://jj-employee-api.railway.app](https://jj-employee-api.railway.app)
- **API Documentation (Swagger):** [https://jj-employee-api.railway.app/api](https://jj-employee-api.railway.app/api)

### 🏗️ Architecture

```
fullstack-challenge/
├── apps/
│   ├── api/          # Backend NestJS + TypeORM + PostgreSQL
│   └── web/          # Frontend Next.js 16 + React 19 + TailwindCSS
├── packages/
│   ├── ui/           # Shared React components
│   ├── eslint-config/# ESLint configurations
│   └── typescript-config/ # TypeScript configurations
└── turbo.json        # Turborepo configuration
```

**Data Flow:**
1. The **Frontend (Next.js)** makes HTTP requests to the **API (NestJS)**
2. The **API** processes requests and interacts with **PostgreSQL** via TypeORM
3. Data is returned in JSON format to the frontend
4. The frontend renders data with internationalization (i18n) support

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
# Edit the .env file with your database settings

# Run in development mode (all apps)
pnpm dev

# Or run individually:
pnpm dev --filter=api   # API only (port 3001)
pnpm dev --filter=web   # Web only (port 3000)
```

#### Environment Variables (API)

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=employees
NODE_ENV=development
```

### 🛠️ Technologies Used

| Technology | Reason for Choice |
|------------|-------------------|
| **Turborepo** | Monorepo with smart caching, parallel builds, and efficient dependency management |
| **Next.js 16** | React framework with SSR/SSG, App Router, and excellent DX |
| **React 19** | Latest version with performance improvements and new hooks |
| **TailwindCSS 4** | Utility-first styling with excellent productivity |
| **NestJS 11** | Robust Node.js framework with modular architecture, DI, and decorators |
| **TypeORM** | TypeScript-first ORM with migrations and relations support |
| **PostgreSQL** | Robust and scalable relational database |
| **Swagger** | Automatic API documentation |
| **pnpm** | Fast and space-efficient package manager |

### 🤖 AI Usage in Development

This project was developed with the assistance of **Windsurf Cascade (Claude Sonnet 4)** as a programming assistant:

**Tools Used:**
- **Windsurf IDE** with integrated Cascade AI

**Purposes and Impact:**
- **Initial scaffolding:** Generation of monorepo base structure and configurations
- **Feature implementation:** Assistance in creating React components, API endpoints, and business logic
- **Debugging:** Identification and fixing of complex bugs
- **Internationalization:** Implementation of i18n system with PT-BR and EN support
- **Refactoring:** Code quality improvement and organization
- **Documentation:** Creation of READMEs and comments

**Impact:** AI significantly accelerated development, allowing focus on architectural decisions and UX while repetitive tasks were automated. Estimated ~40% reduction in development time.

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

### ⚠️ Limitations and Known Issues

1. **Authentication:** The system does not have authentication/authorization implemented
2. **Photo upload:** Photos are referenced by URL, no direct upload
3. **Pagination:** Listing does not have server-side pagination (loads all records)
4. **Tests:** Limited unit and E2E test coverage
5. **Cache:** No caching strategy implemented on the frontend
