# Web - Portal de Funcionários

[English](#english) | [Português](#português)

---

## Português

### 📋 Sobre

Frontend do Portal de Funcionários da Johnson & Johnson. Desenvolvido com Next.js 16, React 19 e TailwindCSS, oferece uma interface moderna e responsiva com suporte a internacionalização (PT-BR e EN).

### 🔗 URL de Produção

- **Aplicação:** [https://jj-employee-portal.netlify.app](https://jj-employee-portal.netlify.app)

### 🏗️ Arquitetura

```
apps/web/
├── app/
│   ├── components/         # Componentes React
│   │   ├── AppNavbar.tsx   # Navegação principal
│   │   ├── EmployeeTable.tsx # Tabela de funcionários
│   │   ├── EmployeeDetailModal.tsx # Modal de detalhes
│   │   ├── EmployeeFormModal.tsx # Modal de formulário
│   │   ├── OrgTree.tsx     # Organograma
│   │   └── ...
│   ├── employees/          # Páginas de funcionários
│   │   ├── table/          # Listagem em tabela
│   │   └── org-chart/      # Organograma
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

- **Listagem de Funcionários:** Visualização em tabela ou cards
- **Organograma:** Visualização hierárquica da organização
- **CRUD Completo:** Criar, visualizar, editar e desativar funcionários
- **Filtros:** Por departamento, tipo e status
- **Busca:** Pesquisa em tempo real por nome, cargo e email
- **Internacionalização:** Suporte a PT-BR e EN
- **Design Responsivo:** Funciona em desktop, tablet e mobile

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
├── AppNavbar.tsx          # Barra de navegação
├── EmployeeTable.tsx      # Tabela com filtros e busca
├── EmployeeTableWrapper.tsx # Wrapper com fetch de dados
├── EmployeeDetailModal.tsx # Modal de detalhes do funcionário
├── EmployeeFormModal.tsx  # Modal de criação/edição
├── EmployeePhoto.tsx      # Componente de foto com fallback
├── OrgTree.tsx            # Organograma interativo
├── OrgTreeWrapper.tsx     # Wrapper com fetch de dados
├── LanguageSelector.tsx   # Seletor de idioma
└── ConfirmModal.tsx       # Modal de confirmação
```

### 🌐 Internacionalização

O sistema suporta dois idiomas:
- **Português (PT-BR)** - Padrão
- **English (EN)**

As traduções estão em `app/i18n/translations.ts` e são gerenciadas pelo `LanguageContext`.

### ⚠️ Limitações

- Sem SSR para dados dinâmicos (client-side fetching)
- Sem cache de dados (refetch a cada navegação)
- Sem testes unitários/E2E
- Fotos são URLs externas (sem upload)

---

## English

### 📋 About

Frontend for the Johnson & Johnson Employee Portal. Built with Next.js 16, React 19, and TailwindCSS, it offers a modern and responsive interface with internationalization support (PT-BR and EN).

### 🔗 Production URL

- **Application:** [https://jj-employee-portal.netlify.app](https://jj-employee-portal.netlify.app)

### 🏗️ Architecture

```
apps/web/
├── app/
│   ├── components/         # React components
│   │   ├── AppNavbar.tsx   # Main navigation
│   │   ├── EmployeeTable.tsx # Employee table
│   │   ├── EmployeeDetailModal.tsx # Details modal
│   │   ├── EmployeeFormModal.tsx # Form modal
│   │   ├── OrgTree.tsx     # Org chart
│   │   └── ...
│   ├── employees/          # Employee pages
│   │   ├── table/          # Table listing
│   │   └── org-chart/      # Org chart
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

- **Employee Listing:** Table or card view
- **Org Chart:** Hierarchical organization view
- **Full CRUD:** Create, view, edit, and deactivate employees
- **Filters:** By department, type, and status
- **Search:** Real-time search by name, job title, and email
- **Internationalization:** PT-BR and EN support
- **Responsive Design:** Works on desktop, tablet, and mobile

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
├── AppNavbar.tsx          # Navigation bar
├── EmployeeTable.tsx      # Table with filters and search
├── EmployeeTableWrapper.tsx # Wrapper with data fetching
├── EmployeeDetailModal.tsx # Employee details modal
├── EmployeeFormModal.tsx  # Create/edit modal
├── EmployeePhoto.tsx      # Photo component with fallback
├── OrgTree.tsx            # Interactive org chart
├── OrgTreeWrapper.tsx     # Wrapper with data fetching
├── LanguageSelector.tsx   # Language selector
└── ConfirmModal.tsx       # Confirmation modal
```

### 🌐 Internationalization

The system supports two languages:
- **Portuguese (PT-BR)** - Default
- **English (EN)**

Translations are in `app/i18n/translations.ts` and managed by `LanguageContext`.

### ⚠️ Limitations

- No SSR for dynamic data (client-side fetching)
- No data caching (refetch on each navigation)
- No unit/E2E tests
- Photos are external URLs (no upload)
