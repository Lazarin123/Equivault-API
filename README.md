# ⚡ Equivault API

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

### API de gestão de despesas colaborativas multi-moeda

**Equivault** é uma API RESTful desenvolvida para gerenciamento de despesas compartilhadas entre grupos, com suporte a múltiplas moedas, conversão cambial e **otimização automática das transações necessárias para liquidar as dívidas**.

</div>

---

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Problema Resolvido](#-problema-resolvido)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Tecnologias](#️-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura-do-sistema)
- [Fluxo da Aplicação](#-fluxo-da-aplicação)
- [Modelo de Funcionamento](#-modelo-de-funcionamento)
- [Endpoints](#-endpoints-da-api)
- [Exemplo de Uso](#-exemplo-de-uso)
- [Configuração](#️-configuração-do-ambiente)
- [Instalação](#-instalação)
- [Scripts](#️-scripts-disponíveis)
- [Banco de Dados](#️-banco-de-dados)
- [Precisão Monetária](#-precisão-monetária)
- [Otimização de Dívidas](#-otimização-de-dívidas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Demonstração](#-demonstração)
- [Melhorias Futuras](#-melhorias-futuras)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🚀 Sobre o Projeto

O **Equivault** nasceu para solucionar um problema comum em viagens, eventos, repúblicas, grupos de amigos e qualquer situação em que várias pessoas compartilham despesas.

Quando diferentes participantes pagam contas diferentes, o cálculo tradicional pode gerar uma grande quantidade de transferências.

Por exemplo:

```text
Samuel → R$ 120,00
João   → R$ 80,00
Maria  → R$ 40,00
Carlos → R$ 0,00
```

Em vez de simplesmente dividir os valores, o Equivault calcula o **saldo líquido de cada participante** e determina quais transações são necessárias para equilibrar o grupo.

O sistema também foi projetado para trabalhar com **múltiplas moedas**, permitindo que despesas em USD, EUR, BRL e outras moedas sejam convertidas para a moeda padrão definida pelo grupo.

### Objetivos principais

- Centralizar despesas compartilhadas.
- Trabalhar com diferentes moedas.
- Converter valores utilizando taxas de câmbio.
- Calcular automaticamente os saldos individuais.
- Minimizar a quantidade de transferências.
- Manter precisão nos cálculos financeiros.
- Separar regras de negócio da infraestrutura.
- Construir uma API escalável e organizada.

---

## 🎯 Problema Resolvido

Imagine uma viagem internacional com quatro pessoas.

Durante a viagem:

- uma pessoa paga o hotel;
- outra paga restaurantes;
- outra paga transporte;
- outra compra ingressos;
- algumas despesas são realizadas em EUR;
- outras em USD;
- outras em BRL.

No final, determinar manualmente quem deve pagar quem pode se tornar complexo.

O Equivault centraliza essas informações e produz uma estrutura semelhante a:

```text
┌───────────────┐
│    Despesas   │
└───────┬───────┘
        │
        ▼
┌─────────────────────┐
│ Conversão de moeda  │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Cálculo dos saldos  │
└─────────┬───────────┘
          │
          ▼
┌────────────────────────────┐
│ Simplificação das dívidas  │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│ Transações necessárias     │
└────────────────────────────┘
```

---

# ✨ Principais Funcionalidades

## 👥 Gerenciamento de grupos

Criação de grupos financeiros com uma moeda padrão.

Cada grupo pode possuir diversos participantes.

Exemplo:

```json
{
  "name": "Viagem para Portugal",
  "currency": "EUR"
}
```

---

## 👤 Gerenciamento de membros

Participantes podem ser adicionados a grupos existentes.

Exemplo:

```json
{
  "name": "Samuel"
}
```

---

## 💰 Registro de despesas

O sistema permite registrar despesas vinculadas a um grupo.

As despesas podem utilizar uma moeda diferente da moeda padrão do grupo.

Exemplo:

```json
{
  "description": "Jantar",
  "amount": 120.5,
  "currency": "USD",
  "paidBy": "member-id"
}
```

---

## 💱 Conversão de moedas

As despesas são convertidas para a moeda padrão do grupo utilizando taxas de câmbio.

Exemplo conceitual:

```text
Despesa:
USD 100.00

Cotação:
1 USD = EUR 0.92

Valor convertido:
EUR 92.00
```

---

## ⚖️ Cálculo de balanço

O sistema calcula quanto cada participante:

- pagou;
- deveria pagar;
- possui a receber;
- possui a pagar.

O resultado é transformado em um balanço consolidado.

---

## 🔄 Simplificação de dívidas

Depois do cálculo dos saldos, o sistema procura reduzir a quantidade de transações necessárias.

Exemplo:

```text
Antes:

A → B
B → C
C → A
A → D
D → C

Depois:

A → C
D → C
```

O objetivo é representar o fluxo financeiro de maneira mais simples, mantendo o valor líquido devido por cada participante.

---

# 🛠️ Tecnologias Utilizadas

| Tecnologia            | Utilização                             |
| --------------------- | -------------------------------------- |
| **Node.js**           | Runtime da aplicação                   |
| **TypeScript**        | Tipagem estática e segurança do código |
| **Fastify**           | Framework HTTP de alta performance     |
| **Prisma ORM**        | Acesso e modelagem do banco de dados   |
| **PostgreSQL**        | Banco de dados relacional              |
| **Zod**               | Validação e definição de schemas       |
| **REST API**          | Comunicação entre cliente e servidor   |
| **Exchange Rate API** | Obtenção das taxas de câmbio           |

---

# 🏗️ Arquitetura do Sistema

O projeto utiliza princípios de **Clean Architecture**, buscando separar responsabilidades e reduzir o acoplamento entre as diferentes partes da aplicação.

A organização permite que regras importantes, como cálculo de saldo e simplificação de dívidas, permaneçam independentes de detalhes externos como HTTP ou banco de dados.

```text
                         ┌──────────────────┐
                         │     Cliente      │
                         │ Frontend / API   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │     Fastify      │
                         │ Routes / HTTP    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Zod Validation   │
                         │ Input Validation │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Application      │
                         │ Use Cases        │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
          ┌──────────────────┐       ┌──────────────────┐
          │ Domain           │       │ External Services│
          │ Business Rules   │       │ Exchange Rates   │
          └────────┬─────────┘       └──────────────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Infrastructure   │
          │ Prisma ORM       │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │   PostgreSQL     │
          └──────────────────┘
```

---

# 📐 Fluxo da Aplicação

```text
[ Cliente / Frontend ]
          │
          │ HTTP / JSON
          ▼
[ Fastify Routes ]
          │
          ▼
[ Zod Validation ]
          │
          ▼
[ Application Use Cases ]
          │
          ├───────────────► [ Exchange Rate API ]
          │                         │
          │                         ▼
          │                  [ Conversão Cambial ]
          │
          ▼
[ Domain Business Rules ]
          │
          ├───────────────► [ Balance Calculation ]
          │
          └───────────────► [ Debt Simplification ]
                                      │
                                      ▼
                              [ Optimized Transactions ]
                                      │
                                      ▼
                              [ Prisma ORM ]
                                      │
                                      ▼
                                [ PostgreSQL ]
```

---

# 🧮 Modelo de Funcionamento

O processamento do balanço pode ser representado conceitualmente em quatro etapas.

### 1. Coleta das despesas

```text
Participante A → R$ 500
Participante B → R$ 200
Participante C → R$ 100
```

### 2. Cálculo do valor individual

Se o total das despesas for:

```text
R$ 800
```

e existirem quatro participantes:

```text
R$ 800 / 4 = R$ 200 por pessoa
```

### 3. Cálculo do saldo

```text
Participante A
Pagou:       R$ 500
Deveria:     R$ 200
Saldo:      +R$ 300

Participante B
Pagou:       R$ 200
Deveria:     R$ 200
Saldo:       R$ 0

Participante C
Pagou:       R$ 100
Deveria:     R$ 200
Saldo:      -R$ 100

Participante D
Pagou:       R$ 0
Deveria:     R$ 200
Saldo:      -R$ 200
```

### 4. Geração das transações

```text
C → A : R$ 100
D → A : R$ 200
```

O resultado representa o fluxo financeiro necessário para equilibrar os participantes.

---

# 🔄 Otimização de Dívidas

Uma das principais características do Equivault é o serviço de **Debt Simplification**.

A lógica utiliza uma abordagem gulosa para trabalhar com:

```text
Credores
    +
Devedores
    ↓
Matching de saldos
    ↓
Transações simplificadas
```

Conceitualmente:

```text
Credores:

A +300
B +100

Devedores:

C -250
D -150
```

O algoritmo pode produzir:

```text
C → A : 250
D → A : 50
D → B : 100
```

Dessa maneira, o sistema transforma os saldos individuais em uma sequência objetiva de transferências.

> A implementação do algoritmo pode variar de acordo com as regras específicas adotadas pelo projeto.

---

# 📡 Endpoints da API

| Método | Endpoint                    | Descrição                     |
| ------ | --------------------------- | ----------------------------- |
| `POST` | `/groups`                   | Cria um novo grupo            |
| `POST` | `/groups/:groupId/members`  | Adiciona um membro ao grupo   |
| `POST` | `/groups/:groupId/expenses` | Registra uma nova despesa     |
| `GET`  | `/groups/:groupId/balance`  | Calcula o balanço consolidado |

---

## `POST /groups`

Cria um novo grupo financeiro.

### Request

```json
{
  "name": "Viagem Europa",
  "currency": "EUR"
}
```

### Response

```json
{
  "id": "group-id",
  "name": "Viagem Europa",
  "currency": "EUR"
}
```

---

## `POST /groups/:groupId/members`

Adiciona um participante ao grupo.

### Request

```json
{
  "name": "Samuel"
}
```

### Response

```json
{
  "id": "member-id",
  "name": "Samuel",
  "groupId": "group-id"
}
```

---

## `POST /groups/:groupId/expenses`

Registra uma nova despesa.

### Request

```json
{
  "description": "Jantar",
  "amount": 150,
  "currency": "USD",
  "paidBy": "member-id"
}
```

### Fluxo

```text
Request
   │
   ▼
Zod Validation
   │
   ▼
Currency Conversion
   │
   ▼
Expense Registration
   │
   ▼
PostgreSQL
```

---

## `GET /groups/:groupId/balance`

Calcula o balanço financeiro do grupo.

### Exemplo de resposta

```json
{
  "groupId": "group-id",
  "currency": "EUR",
  "balances": [
    {
      "member": "Samuel",
      "balance": 250
    },
    {
      "member": "João",
      "balance": -150
    },
    {
      "member": "Maria",
      "balance": -100
    }
  ],
  "transactions": [
    {
      "from": "João",
      "to": "Samuel",
      "amount": 150
    },
    {
      "from": "Maria",
      "to": "Samuel",
      "amount": 100
    }
  ]
}
```

---

# 💵 Precisão Monetária

Aplicações financeiras precisam tratar cuidadosamente problemas de precisão de ponto flutuante.

Operações simples em JavaScript podem produzir resultados inesperados:

```javascript
0.1 + 0.2;
```

Resultado matemático esperado:

```text
0.3
```

Porém, representações binárias de números de ponto flutuante podem resultar em valores próximos de:

```text
0.30000000000000004
```

Por isso, o Equivault considera explicitamente o tratamento de valores monetários durante os cálculos e conversões.

### Estratégia

Os valores são normalizados e arredondados em pontos apropriados do processamento para evitar que pequenos erros de representação sejam acumulados.

> Para aplicações financeiras em produção, uma estratégia baseada em unidades inteiras mínimas (como centavos) ou uma biblioteca decimal especializada também pode ser adotada.

---

# 💱 Conversão Multi-Moeda

Cada grupo possui uma moeda padrão.

Exemplo:

```text
Grupo
Moeda padrão: EUR
```

Uma despesa pode ser registrada em:

```text
USD
GBP
BRL
EUR
```

O sistema converte o valor para a moeda padrão antes de consolidar os saldos.

### Exemplo

```text
Grupo:
EUR

Despesa:
USD 100

Cotação:
1 USD = 0.92 EUR

Valor consolidado:
EUR 92
```

Isso permite que diferentes despesas sejam comparadas e consolidadas dentro de uma mesma referência monetária.

---

# 🗄️ Banco de Dados

O projeto utiliza **PostgreSQL** como banco de dados relacional e **Prisma ORM** como camada de acesso.

Estrutura conceitual:

```text
┌──────────────┐
│    Group     │
├──────────────┤
│ id           │
│ name         │
│ currency     │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│    Member    │
├──────────────┤
│ id           │
│ name         │
│ groupId      │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│   Expense    │
├──────────────┤
│ id           │
│ description  │
│ amount       │
│ currency     │
│ paidBy       │
│ groupId      │
└──────────────┘
```

---

# 📁 Estrutura do Projeto

A estrutura pode seguir a organização abaixo:

```text
equivault-api/
│
├── src/
│   │
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── services/
│   │
│   ├── application/
│   │   ├── use-cases/
│   │   └── services/
│   │
│   ├── infrastructure/
│   │   ├── database/
│   │   │   └── prisma/
│   │   ├── http/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── schemas/
│   │   └── services/
│   │
│   ├── config/
│   │
│   └── server.ts
│
├── prisma/
│   └── schema.prisma
│
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

> A estrutura acima representa uma organização arquitetural sugerida. Ajuste os nomes das pastas caso a implementação atual do projeto utilize uma estrutura diferente.

---

# ⚙️ Configuração do Ambiente

## Pré-requisitos

Antes de iniciar o projeto, certifique-se de possuir:

- **Node.js 18+**
- **npm**
- **PostgreSQL**
- Git
- Uma API/provedor de taxas de câmbio, caso o projeto utilize um serviço externo.

---

# 📥 Instalação

## 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/equivault-api.git
```

Entre no diretório:

```bash
cd equivault-api
```

---

## 2. Instale as dependências

```bash
npm install
```

---

## 3. Configure as variáveis de ambiente

Crie um arquivo:

```text
.env
```

Na raiz do projeto.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/equivault_db?schema=public"

PORT=3333
```

Caso exista uma API de câmbio configurada no projeto, adicione também as respectivas variáveis:

```env
EXCHANGE_RATE_API_URL="sua-url"
EXCHANGE_RATE_API_KEY="sua-chave"
```

> Nunca publique chaves de API ou credenciais reais no repositório.

---

## 4. Configure o banco de dados

Execute:

```bash
npx prisma db push
```

Ou, caso o projeto utilize migrations:

```bash
npx prisma migrate dev
```

---

## 5. Gere o Prisma Client

```bash
npx prisma generate
```

---

## 6. Inicie o servidor

Modo desenvolvimento:

```bash
npm run dev
```

A API estará disponível, dependendo da configuração, em:

```text
http://localhost:3333
```

---

# ▶️ Scripts Disponíveis

Os scripts dependem do `package.json` configurado no projeto.

Um exemplo de configuração:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsup src/server.ts --out-dir dist",
    "start": "node dist/server.js",
    "test": "vitest",
    "lint": "eslint ."
  }
}
```

Com isso:

### Desenvolvimento

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Produção

```bash
npm start
```

### Testes

```bash
npm test
```

### Lint

```bash
npm run lint
```

> Ajuste os comandos acima caso os scripts reais do projeto sejam diferentes.

---

# 🧪 Testando a API

A API pode ser testada utilizando ferramentas como:

- Insomnia
- Postman
- Bruno
- REST Client
- Thunder Client
- cURL

Exemplo com cURL:

```bash
curl -X POST http://localhost:3333/groups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Viagem Europa",
    "currency": "EUR"
  }'
```

---

# 📸 Demonstração

## API em funcionamento

Adicione aqui uma captura de tela do projeto rodando no **Insomnia**, **Postman** ou outra ferramenta de testes.

```text
docs/
└── api-demo.png
```

Depois, no README:

```markdown
![Demonstração da API](./docs/api-demo.png)
```

### Sugestão de conteúdo da captura

A imagem pode mostrar:

```text
POST /groups
        ↓
POST /groups/:groupId/members
        ↓
POST /groups/:groupId/expenses
        ↓
GET /groups/:groupId/balance
        ↓
Resposta com saldos e transações otimizadas
```

---

# 📊 Fluxograma Visual

![Arquitetura do Equivault](./docs/architecture.jpg)

---

# 💡 Diferenciais Técnicos

## Clean Architecture

Separação entre:

```text
Domain
Application
Infrastructure
HTTP
Database
External Services
```

Isso facilita manutenção, testes e evolução do sistema.

---

## Type Safety

O projeto utiliza TypeScript para reduzir erros relacionados aos tipos durante o desenvolvimento.

---

## Validação de Dados

O Zod é utilizado para validar entradas da API antes que elas cheguem às regras de negócio.

Exemplo conceitual:

```typescript
const createExpenseSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().length(3),
  paidBy: z.string(),
});
```

---

## Performance

O Fastify foi escolhido como framework HTTP devido ao seu baixo overhead e foco em performance.

---

## Persistência Relacional

O PostgreSQL permite manter uma estrutura consistente para:

- grupos;
- membros;
- despesas;
- relacionamentos;
- histórico financeiro.

---

## Algoritmo de Simplificação

O projeto não apenas calcula despesas.

Ele também transforma os saldos em um fluxo de transações mais simples.

Isso torna o projeto interessante do ponto de vista de:

- algoritmos;
- estruturas de dados;
- regras de negócio;
- engenharia de software;
- sistemas financeiros.

---

# 🔐 Considerações de Segurança

Algumas práticas importantes para evolução do projeto:

- Não armazenar secrets no Git.
- Utilizar `.env` localmente.
- Criar `.env.example` sem credenciais.
- Validar todos os dados recebidos pela API.
- Validar identificadores e relacionamentos.
- Utilizar HTTPS em produção.
- Aplicar rate limiting.
- Implementar autenticação quando necessário.
- Registrar logs sem expor informações sensíveis.

---

# 🧪 Testes

Uma suíte de testes pode validar principalmente:

### Grupos

```text
✓ Criação de grupo
✓ Validação da moeda
✓ Validação do nome
```

### Membros

```text
✓ Adição de membro
✓ Associação ao grupo
✓ Validação de dados
```

### Despesas

```text
✓ Criação de despesa
✓ Valores positivos
✓ Conversão de moeda
✓ Associação ao participante
```

### Balanço

```text
✓ Cálculo do valor individual
✓ Cálculo dos saldos
✓ Identificação de credores
✓ Identificação de devedores
✓ Simplificação das transações
```

---

# 🧠 Conceitos de Engenharia Aplicados

Este projeto foi desenvolvido para explorar e demonstrar conceitos como:

```text
Clean Architecture
        │
        ├── Separation of Concerns
        │
        ├── Dependency Inversion
        │
        ├── Domain-Driven Rules
        │
        ├── REST APIs
        │
        ├── Type Safety
        │
        ├── Data Validation
        │
        ├── Relational Databases
        │
        ├── Currency Conversion
        │
        └── Algorithmic Optimization
```

O projeto vai além de um CRUD tradicional ao incorporar regras de negócio relacionadas a **cálculos financeiros, conversão monetária e otimização de transações**.

---

# 📈 Possível Arquitetura de Produção

Em um cenário de produção, a arquitetura pode evoluir para:

```text
                         ┌─────────────────┐
                         │    Frontend     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   API Gateway   │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │ Equivault API   │
                         │   Fastify       │
                         └───────┬─────────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
          ┌────────────┐ ┌────────────┐ ┌──────────────┐
          │ PostgreSQL │ │   Cache    │ │ Exchange API │
          │            │ │   Redis    │ │              │
          └────────────┘ └────────────┘ └──────────────┘
```

Essa estrutura permitiria adicionar mecanismos de cache, escalabilidade horizontal, observabilidade e integração com serviços externos.

---

# 📚 Documentação da API

Caso o projeto utilize Swagger/OpenAPI, a documentação poderá ser disponibilizada em:

```text
http://localhost:3333/docs
```

Exemplo de estrutura:

```text
/docs
   ├── Groups
   ├── Members
   ├── Expenses
   └── Balance
```

---

# 📦 Deploy

O projeto pode ser preparado para execução em ambientes como:

- Docker
- Render
- Railway
- Fly.io
- AWS
- Azure
- Google Cloud
- VPS

Exemplo de fluxo:

```text
GitHub
   │
   ▼
CI/CD
   │
   ▼
Build
   │
   ▼
Tests
   │
   ▼
Deploy
   │
   ▼
Production API
```

---

# 📜 Licença

Este projeto está licenciado sob a **MIT License**.

Você pode utilizar, modificar e distribuir o projeto de acordo com os termos da licença.

---

# 👨‍💻 Autor

**Samuel Lazarin**

Desenvolvedor focado em:

- Desenvolvimento Full Stack
- Backend
- TypeScript
- Node.js
- APIs REST
- Automação
- Qualidade de Software
- Arquitetura de Software

---

<div align="center">

### ⚡ Equivault API

**Transformando despesas compartilhadas em um fluxo financeiro simples e otimizado.**

Built with TypeScript, Node.js, Fastify, Prisma and PostgreSQL.

</div>
