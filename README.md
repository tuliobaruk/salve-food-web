# SalveFood Web

Bem-vindo ao SalveFood Web! Uma plataforma front-end moderna e responsiva para gerenciamento de restaurantes, cardápios, pedidos e entregadores. Construído com React, TypeScript, Vite e estilizado com Tailwind CSS e Shadcn UI.

## Funcionalidades Principais

* **Autenticação de Usuários:**
    * Cadastro e Login de usuários (proprietários de loja).
    * Rotas protegidas para garantir acesso apenas a usuários autenticados.
    * Gerenciamento de sessão com tokens (Access e Refresh).
* **Gerenciamento de Loja:**
    * Criação e edição de dados da loja (nome, descrição, endereço, imagem, horários, etc.).
    * Dashboard com visão geral dos pedidos, faturamento e informações da loja.
    * Contexto para gerenciamento do estado da loja.
* **Gerenciamento de Cardápio:**
    * Criação, visualização, edição e remoção de itens do cardápio.
    * Upload de imagem para itens.
    * Organização de itens por categorias.
    * Controle de disponibilidade de itens.
    * Paginação para listagem de itens.
* **Gerenciamento de Pedidos:**
    * Visualização de pedidos em diferentes status (Pendentes, Preparando, Aguardando Entregador, A Caminho).
    * Aceitar ou recusar pedidos.
    * Marcar pedido como pronto para entrega.
    * Associar entregador a um pedido.
    * Confirmar entrega de pedido com senha.
    * Notificações sonoras para novos pedidos.
    * Histórico de pedidos entregues.
* **Gerenciamento de Entregadores:**
    * Cadastro, listagem, edição e remoção de entregadores.
    * Upload de imagem para entregadores.
    * Controle de disponibilidade de entregadores.
* **Interface Rica e Responsiva:**
    * Desenvolvida com Tailwind CSS e componentes Shadcn UI para uma experiência de usuário moderna.
    * Design responsivo que se adapta a diferentes tamanhos de tela.
    * Componentes reutilizáveis como Cards, Forms, Dialogs, Toasts, etc.

## Tecnologias Utilizadas

* **Frontend:** React, TypeScript, Vite
* **Roteamento:** React Router DOM
* **Estilização:** Tailwind CSS, PostCSS, Autoprefixer
* **Componentes UI:** Shadcn UI (construído sobre Radix UI)
* **Gerenciamento de Formulários:** React Hook Form, Zod (para validação de schemas)
* **Comunicação API:** Axios
* **Gerenciamento de Estado (Contexto):** AuthContext, LojaContext
* **Ícones:** Lucide React
* **Notificações (Toasts):** Sonner
* **Linting & Formatting:** ESLint, Prettier
* **Outras bibliotecas:** Embla Carousel, React Dropzone, Recharts

## Estrutura do Projeto

```text
salve-food-web/
├── public/                     # Arquivos estáticos
├── src/
│   ├── api/                    # Configuração do Axios, interceptors
│   ├── assets/                 # Imagens, fontes, etc.
│   ├── components/             # Componentes reutilizáveis da UI
│   │   ├── forms/              # Formulários específicos (Login, Cadastro, Criação de Item, etc.)
│   │   ├── landingPagComponents/ # Componentes da página inicial
│   │   ├── sidebar/            # Componentes da barra lateral de navegação
│   │   └── ui/                 # Componentes Shadcn UI customizados/base
│   ├── context/                # Contextos React (Autenticação, Loja)
│   ├── hooks/                  # Hooks customizados (useAuth, useLoja, useItems, etc.)
│   ├── lib/                    # Utilitários, helpers (cn, formatação de dados para forms)
│   ├── pages/                  # Componentes de página (rotas)
│   │   ├── protected/          # Páginas que requerem autenticação
│   │   └── HomePage.tsx, LoginPage.tsx, etc.
│   ├── router.tsx              # Configuração das rotas com React Router
│   ├── schema/                 # Schemas de validação com Zod
│   ├── services/               # Lógica de comunicação com a API (auth, loja, pedido)
│   ├── types/                  # Definições de tipos TypeScript
│   ├── main.tsx                # Ponto de entrada principal da aplicação React
│   └── index.css               # Estilos globais e configuração do Tailwind
├── .env.example                # Exemplo de arquivo de variáveis de ambiente
├── vite.config.ts              # Configuração do Vite
├── tailwind.config.js          # Configuração do Tailwind CSS
├── tsconfig.json               # Configuração do TypeScript
└── package.json                # Dependências do projeto
```
## Rodando Localmente

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento:

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/tuliobaruk/salve-food-web.git](https://github.com/tuliobaruk/salve-food-web.git)
    cd salve-food-web
    ```

2.  **Instale as Dependências:**
    Certifique-se de ter o Node.js e o npm instalados.
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Copie o arquivo `.env.example` para um novo arquivo chamado `.env` e configure a variável `VITE_APP_BACKEND_IP` com o endereço do seu backend.
    ```
    VITE_APP_BACKEND_IP="SEU_IP_DE_BACKEND:PORTA"
    ```

4.  **Rode o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    Isso iniciará a aplicação em modo de desenvolvimento, geralmente em `http://localhost:5173` (ou a porta configurada, com `--host` pode ser acessível na rede local).

## Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes scripts:

* `npm run dev`: Inicia o servidor de desenvolvimento com Vite.
* `npm run build`: Compila a aplicação para produção.
* `npm run lint`: Executa o ESLint para análise de código.
* `npm run format`: Formata o código com Prettier.
* `npm run preview`: Inicia um servidor local para visualizar a build de produção.

## Estilização e Componentes

Este projeto utiliza **Tailwind CSS** para estilização utilitária e **Shadcn UI** para um conjunto de componentes React bem elaborados e acessíveis. A configuração do tema e dos componentes pode ser encontrada em `tailwind.config.js`, `src/index.css`  e `components.json`.

## Backend

Este frontend foi projetado para interagir com um backend específico para gerenciar os dados.

O repositório do backend pode ser encontrado [aqui](https://github.com/bernardogomesrib/salve-food).

Certifique-se de que o backend esteja configurado e em execução para que todas as funcionalidades operem corretamente. A URL do backend é configurada através da variável de ambiente `VITE_APP_BACKEND_IP`.
