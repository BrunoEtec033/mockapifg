# Arquitetura — App Mobile de Gestão de Treinamentos

Este documento descreve a versão integrada do aplicativo: **React Native + Expo** como base funcional, com a identidade visual e o inventário de telas do protótipo criado no Figma.

## 1. Fonte de verdade

O contrato da aplicação é `docs/openapi.json`, copiado do Swagger usado no protótipo. O front não inventa recursos de backend: telas de leitura e escrita seguem os endpoints disponíveis nesse contrato.

Stack principal:

- React Native + Expo + TypeScript
- React Navigation
- React Native Paper
- TanStack React Query
- Axios
- Zod
- Expo Secure Store

## 2. Organização

```text
src/
├── app/
│   ├── navigation/
│   └── providers/
├── core/
│   ├── api/
│   ├── config/
│   ├── errors/
│   └── storage/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── theme/
│   ├── types/
│   └── utils/
└── features/
    ├── auth/
    ├── dashboard/
    ├── treinamentos/
    ├── certificados/
    ├── funcionarios/
    ├── instrutores/
    ├── administracao/
    ├── mais/
    └── perfil/
```

Cada feature mantém suas telas, hooks, services, tipos e componentes locais. A regra continua sendo **Screen → Hook → Service → httpClient → API**.

## 3. Navegação

A navegação principal segue o protótipo do Figma e possui cinco áreas:

1. **Painel**
2. **Treinos**
3. **Certificados**
4. **Funcionários**
5. **Mais**

A área **Mais** concentra recursos menos frequentes e administrativos:

- Instrutores
- Usuários
- Perfis
- Permissões
- Auditoria
- Meu perfil

Treinamentos e Funcionários possuem stacks próprios para lista, detalhe e formulário. Certificados possuem lista e detalhe. A área Mais possui stacks para os módulos administrativos.

## 4. Módulos e endpoints

### Autenticação

- `POST /api/login`
- `GET /api/me`

### Painel

- `GET /api/dashboard`

### Treinamentos

- CRUD de `/api/treinamentos`
- `GET /api/treinamentos/{id}/completo`
- relações com responsáveis, instrutores e participantes
- leitura de evidências e assinaturas relacionadas

### Certificados

- `/api/certificados`
- `GET /api/certificados/{id}/completo`

### Funcionários

- CRUD de `/api/funcionarios`
- contexto de participação em treinamentos e certificados

### Instrutores

- CRUD de `/api/instrutores`
- contexto dos treinamentos relacionados

### Administração

- `/api/usuarios`
- `/api/perfis`
- `/api/permissoes`
- `/api/perfilPermissoes`
- `/api/usuarioPerfis`
- `/api/auditorias`

O Swagger também contém recursos de associação e operação, como participantes, assinaturas e evidências. Eles são apresentados dentro do fluxo ao qual pertencem, em vez de obrigatoriamente virarem uma aba principal.

## 5. Contrato e domínio

A camada de services mantém o contrato HTTP longe das telas. DTOs são validados e mapeados para modelos usados pelo aplicativo.

Os status seguem o Swagger:

- Treinamento: `pendente`, `em_andamento`, `concluido`, `cancelado`
- Participante: `pendente`, `aprovado`, `reprovado`
- Certificado: `valido`, `expirado`, `cancelado`

Quando um certificado marcado como válido já passou da data de validade, a camada de apresentação pode mostrá-lo como expirado para evitar informação visual enganosa, sem alterar o registro no servidor.

## 6. Integração do Figma

O arquivo exportado pelo Figma era um projeto **React Web + Vite**. Ele não foi copiado diretamente para o Expo porque os componentes DOM (`div`, `button`, CSS etc.) não funcionam no React Native.

A integração foi feita preservando:

- estrutura funcional do app Expo;
- hooks e services existentes;
- consumo real da Mock API;
- sessão e tratamento de erros;
- navegação nativa;

E transportando do Figma:

- hierarquia das telas;
- navegação em cinco áreas;
- paleta azul/slate;
- cards, cabeçalhos, busca, chips e organização visual;
- telas de Funcionários, Instrutores e Administração.

Mais detalhes estão em `docs/figma-integracao.md`.

## 7. Por que essa organização

O objetivo é permitir que a API seja substituída ou evolua sem reescrever a interface. A tela não chama Axios diretamente e não conhece strings de endpoint. Mudanças de contrato ficam concentradas em `core/api`, DTOs, mappers e services.

Também evita transformar cada tabela da API em uma aba do aplicativo: recursos de associação são exibidos no contexto de Treinamentos, Funcionários, Instrutores ou Administração.

## 8. Fluxo de dados

```text
Tela
  ↓
Hook / React Query
  ↓
Service da feature
  ↓
httpClient
  ↓
Mock API / API real
```

O `httpClient` centraliza base URL, token, timeout, envelope de resposta e tradução de erros.

## 9. Execução

1. Execute a Mock API.
2. Configure a URL em `.env` conforme `.env.example`.
3. No app: `npm install`.
4. Inicie com `npm start`.

Em celular físico, `localhost` deve ser substituído pelo IP local da máquina que executa a Mock API.
