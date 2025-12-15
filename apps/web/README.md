# Web - Portal de Funcionários

[English](#english) | [Português](#português)

---

## Português

### 📋 Sobre

Frontend do Portal de Funcionários da Johnson & Johnson. Desenvolvido com Next.js 16, React 19 e TailwindCSS, oferece uma interface moderna e responsiva com suporte a internacionalização (PT-BR e EN) e autenticação JWT.

### 🔗 URL de Produção

- **Aplicação:** [https://employee-portal-ruby-eight.vercel.app](https://employee-portal-ruby-eight.vercel.app)

### 🏗️ Arquitetura

```
apps/web/
├── app/
│   ├── auth/               # Autenticação
│   │   ├── AuthContext.tsx # Context de autenticação JWT
│   │   └── index.ts
│   ├── components/         # Componentes React
│   │   ├── AppNavbar.tsx   # Navegação principal
│   │   ├── EmployeeTable.tsx # Tabela de funcionários
│   │   ├── EmployeeDetailModal.tsx # Modal de detalhes
│   │   ├── EmployeeFormModal.tsx # Modal de formulário
│   │   ├── ProtectedRoute.tsx # Proteção de rotas
│   │   ├── OrgTree.tsx     # Organograma
│   │   └── ...
│   ├── employees/          # Páginas de funcionários (protegidas)
│   │   ├── table/          # Listagem em tabela
│   │   └── org-chart/      # Organograma
│   ├── login/              # Página de login
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── i18n/               # Internacionalização
│   │   ├── translations.ts # Traduções PT-BR e EN
│   │   └── LanguageContext.tsx
│   ├── services/           # Serviços de API
│   ├── types/              # Tipos TypeScript
│   └── layout.tsx          # Layout principal
├── public/                 # Assets estáticos
└── tailwind.config.ts      # Configuração TailwindCSS
```

### 🚀 Como Executar

#### Pré-requisitos
- Node.js >= 18
- pnpm >= 9.0.0
- API rodando (porta 3001)

#### Instalação

```bash
# A partir da raiz do monorepo
cd apps/web

# Instale as dependências (se não instalou na raiz)
pnpm install

# Execute em modo desenvolvimento
pnpm dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

### 🎨 Funcionalidades

- **Autenticação:** Login com JWT e proteção de rotas
- **Listagem de Funcionários:** Visualização em tabela ou cards
- **Organograma:** Visualização hierárquica da organização
- **CRUD Completo:** Criar, visualizar, editar e desativar funcionários
- **Filtros:** Por departamento, tipo e status
- **Busca:** Pesquisa em tempo real por nome, cargo e email
- **Internacionalização:** Suporte a PT-BR e EN (seleção na tela de login)
- **Design Responsivo:** Funciona em desktop, tablet e mobile
- **Brand J&J:** Cores e estilos seguindo as diretrizes da marca

### 🛠️ Tecnologias

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Next.js** | 16.x | Framework React com App Router |
| **React** | 19.x | Biblioteca de UI |
| **TailwindCSS** | 4.x | Estilização utility-first |
| **TypeScript** | 5.x | Tipagem estática |
| **CSS Modules** | - | Estilos escopados por componente |

### 📁 Estrutura de Componentes

```
components/
├── ui/                    # Componentes UI reutilizáveis
│   ├── Navbar.tsx         # Componente base de navegação
│   ├── Navbar.module.css  # Estilos do Navbar
│   └── index.ts           # Exports
├── AppNavbar.tsx          # Barra de navegação com logout
├── ProtectedRoute.tsx     # HOC para proteção de rotas
├── EmployeeTable.tsx      # Tabela com filtros e busca
├── EmployeeTableWrapper.tsx # Wrapper com fetch de dados
├── EmployeeDetailModal.tsx # Modal de detalhes do funcionário
├── EmployeeFormModal.tsx  # Modal de criação/edição
├── EmployeePhoto.tsx      # Componente de foto com fallback
├── OrgTree.tsx            # Organograma interativo
├── OrgTreeWrapper.tsx     # Wrapper com fetch de dados
└── ConfirmModal.tsx       # Modal de confirmação
```

### 🔐 Autenticação

O sistema implementa autenticação JWT:

- **Login:** Página dedicada com seletor de idioma
- **Token:** Armazenado no localStorage
- **Proteção:** Todas as rotas de funcionários requerem autenticação
- **Logout:** Botão na navbar remove o token e redireciona para login
- **Credenciais demo:** `admin` / `admin123`

### 🌐 Internacionalização

O sistema suporta dois idiomas:
- **Português (PT-BR)** - Padrão
- **English (EN)**

A seleção de idioma é feita na tela de login e persiste no `localStorage`.

### 🤖 Uso de IA no Desenvolvimento

Este módulo foi desenvolvido com auxílio de **Windsurf Cascade (Claude Sonnet 4)**:

**Propósitos:**
- **Componentes React:** Tabelas, modais, formulários e organograma
- **Internacionalização:** Sistema i18n com Context API e traduções
- **Autenticação:** AuthContext com JWT e proteção de rotas
- **UI/UX:** Design responsivo com TailwindCSS seguindo brand J&J
- **TypeScript:** Tipagem de props, estados e respostas da API

**Impacto:** Desenvolvimento ágil de componentes complexos e sistema de i18n completo.

### ⚠️ Limitações

- Sem SSR para dados dinâmicos (client-side fetching)
- Sem cache de dados (refetch a cada navegação)
- Sem testes unitários/E2E
- Fotos são URLs externas (sem upload)

---

## English

### 📋 About

Frontend for the Johnson & Johnson Employee Portal. Built with Next.js 16, React 19, and TailwindCSS, it offers a modern and responsive interface with internationalization support (PT-BR and EN) and JWT authentication.

### 🔗 Production URL

- **Application:** [https://employee-portal-ruby-eight.vercel.app](https://employee-portal-ruby-eight.vercel.app)

### 🏗️ Architecture

```
apps/web/
├── app/
│   ├── auth/               # Authentication
│   │   ├── AuthContext.tsx # JWT authentication context
│   │   └── index.ts
│   ├── components/         # React components
│   │   ├── AppNavbar.tsx   # Main navigation
│   │   ├── EmployeeTable.tsx # Employee table
│   │   ├── EmployeeDetailModal.tsx # Details modal
│   │   ├── EmployeeFormModal.tsx # Form modal
│   │   ├── ProtectedRoute.tsx # Route protection
│   │   ├── OrgTree.tsx     # Org chart
│   │   └── ...
│   ├── employees/          # Employee pages (protected)
│   │   ├── table/          # Table listing
│   │   └── org-chart/      # Org chart
│   ├── login/              # Login page
│   │   ├── page.tsx
│   │   └── page.module.css
│   ├── i18n/               # Internationalization
│   │   ├── translations.ts # PT-BR and EN translations
│   │   └── LanguageContext.tsx
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   └── layout.tsx          # Main layout
├── public/                 # Static assets
└── tailwind.config.ts      # TailwindCSS configuration
```

### 🚀 How to Run

#### Prerequisites
- Node.js >= 18
- pnpm >= 9.0.0
- API running (port 3001)

#### Installation

```bash
# From the monorepo root
cd apps/web

# Install dependencies (if not installed at root)
pnpm install

# Run in development mode
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 🎨 Features

- **Authentication:** JWT login with route protection
- **Employee Listing:** Table or card view
- **Org Chart:** Hierarchical organization view
- **Full CRUD:** Create, view, edit, and deactivate employees
- **Filters:** By department, type, and status
- **Search:** Real-time search by name, job title, and email
- **Internationalization:** PT-BR and EN support (selection on login page)
- **Responsive Design:** Works on desktop, tablet, and mobile
- **J&J Brand:** Colors and styles following brand guidelines

### 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.x | React framework with App Router |
| **React** | 19.x | UI library |
| **TailwindCSS** | 4.x | Utility-first styling |
| **TypeScript** | 5.x | Static typing |
| **CSS Modules** | - | Component-scoped styles |

### 📁 Component Structure

```
components/
├── ui/                    # Reusable UI components
│   ├── Navbar.tsx         # Base navigation component
│   ├── Navbar.module.css  # Navbar styles
│   └── index.ts           # Exports
├── AppNavbar.tsx          # Navigation bar with logout
├── ProtectedRoute.tsx     # HOC for route protection
├── EmployeeTable.tsx      # Table with filters and search
├── EmployeeTableWrapper.tsx # Wrapper with data fetching
├── EmployeeDetailModal.tsx # Employee details modal
├── EmployeeFormModal.tsx  # Create/edit modal
├── EmployeePhoto.tsx      # Photo component with fallback
├── OrgTree.tsx            # Interactive org chart
├── OrgTreeWrapper.tsx     # Wrapper with data fetching
└── ConfirmModal.tsx       # Confirmation modal
```

### 🔐 Authentication

The system implements JWT authentication:

- **Login:** Dedicated page with language selector
- **Token:** Stored in localStorage
- **Protection:** All employee routes require authentication
- **Logout:** Navbar button removes token and redirects to login
- **Demo credentials:** `admin` / `admin123`

### 🌐 Internationalization

The system supports two languages:
- **Portuguese (PT-BR)** - Default
- **English (EN)**

Language selection is done on the login page and persists in `localStorage`.

### 🤖 AI Usage in Development

This module was developed with the assistance of **Windsurf Cascade (Claude Sonnet 4)**:

**Purposes:**
- **React Components:** Tables, modals, forms, and org chart
- **Internationalization:** i18n system with Context API and translations
- **Authentication:** AuthContext with JWT and route protection
- **UI/UX:** Responsive design with TailwindCSS following J&J brand
- **TypeScript:** Props, state, and API response typing

**Impact:** Agile development of complex components and complete i18n system.

### ⚠️ Limitations

- No SSR for dynamic data (client-side fetching)
- No data caching (refetch on each navigation)
- No unit/E2E tests
- Photos are external URLs (no upload)
