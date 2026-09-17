# Nota de versão

> **Atualização da integração Figma:** esta versão possui cinco áreas principais (Painel, Treinos, Certificados, Funcionários e Mais) e módulos de Instrutores/Administração. Em caso de conflito com orientações antigas abaixo, prevalecem `docs/openapi.json`, `docs/arquitetura.md` e `specs.md`.

# ai.md — como trabalhar neste repositório

Contrato de trabalho para agentes de IA (Claude Code, Copilot, Cursor) e para qualquer pessoa que entre no projeto. Leia antes de gerar código. Em conflito com um pedido pontual, **este arquivo vence** — ou o pedido muda o arquivo primeiro.

---

## 1. O projeto em cinco linhas

LINHA é um app Expo + TypeScript de gestão de treinamentos obrigatórios, consumindo a Mock API `mock-api-treinamentos`.
Organizado por **features**, com camadas `app / core / shared / features`.
Fluxo obrigatório de dados: **Screen → Hook → Service → API**.
A API **não está finalizada** — o código assume que o contrato vai mudar.
Documentos: `docs/arquitetura.md` (o porquê), `specs.md` (o quê), `docs/api-gaps.md` (o que falta).

---

## 2. Regras que não se negociam

1. **Nenhuma tela faz requisição.** `axios`/`fetch` só existem em `src/core/api`. Se um componente importa `axios`, o PR está errado.
2. **Nenhuma string de rota fora de `core/api/endpoints.ts`.**
3. **Todo dado da API passa por um mapper.** Nunca renderize DTO. `Treinamento` (domínio) ≠ `TreinamentoDto` (API).
4. **Todo dado da API é validado com Zod** no `.dto.ts` da feature.
5. **Todo erro que chega à tela é `AppError`.** Nunca `AxiosError`, nunca `status === 403` numa tela.
6. **Import entre features só pelo `index.ts`.** `@features/auth` sim; `@features/auth/services/authService` não.
7. **Direção da dependência:** `app → features → shared → core`. Nunca ao contrário. `core` e `shared` não sabem o que é "treinamento".
8. **Nada novo em `shared` sem dois consumidores reais.** Um consumidor = fica na feature.
9. **Nenhum hex solto.** Cor, espaçamento, raio e fonte vêm de `@shared/theme`.
10. **Toda tela com dado remoto trata os quatro estados:** carregando, erro, vazio, conteúdo.

---

## 3. Onde colocar cada coisa

| Vou criar... | Vai em |
|---|---|
| Uma tela | `features/<feature>/screens/` |
| Estado ou comportamento dessa tela | `features/<feature>/hooks/` |
| Uma chamada de API | `features/<feature>/services/<feature>Service.ts` |
| O schema Zod da resposta | `features/<feature>/services/<feature>.dto.ts` |
| A conversão DTO → domínio | `features/<feature>/services/<feature>.mapper.ts` |
| O tipo que o app usa | `features/<feature>/types.ts` |
| Um componente usado só por essa feature | `features/<feature>/components/` |
| Um componente usado por 2+ features | `shared/components/` |
| Uma rota nova | `app/navigation/` + tipo em `tipos.ts` |
| Uma cor, fonte ou espaçamento | `shared/theme/tokens.ts` |
| Uma URL, timeout ou variável de ambiente | `core/config/env.ts` |
| Um endpoint | `core/api/endpoints.ts` |
| Uma chave de armazenamento | `core/storage/keys.ts` |
| Um código de erro | `core/errors/errorCodes.ts` |

Na dúvida entre feature e `shared`: **feature**. Promover depois é fácil; desmontar abstração errada, não.

---

## 4. Receita: adicionar uma tela que lê da API

Ordem fixa — de baixo para cima:

```
1. endpoints.ts          adiciona a rota
2. <feature>.dto.ts      schema Zod espelhando a resposta REAL (rode curl antes)
3. types.ts              modelo de domínio: como o APP quer o dado
4. <feature>.mapper.ts   DTO -> domínio, absorvendo null e campo faltante
5. <feature>Service.ts   função async, sem React
6. hooks/useX.ts         useQuery + query key + useAppErro
7. screens/XScreen.tsx   JSX com os 4 estados
8. app/navigation/       registra a rota e tipa os parâmetros
9. index.ts da feature   exporta só o que sai
```

Pulou o passo 2 ou 4? O código vai quebrar quando a API mudar — e ela vai mudar.

---

## 5. A API não está finalizada: como lidar

Antes de escrever um `.dto.ts`, **confira a resposta real**:

```bash
curl -s http://localhost:3000/api/treinamentos/1/completo | jq
```

O `openapi.json` é a intenção; o `curl` é o fato. Divergiu? Modele o fato, anote a intenção em `docs/api-gaps.md`.

**Endpoint que não existe ainda:**
1. Crie a flag em `core/config/featureFlags.ts`
2. Construa a tela normalmente
3. Com a flag desligada, renderize `<EstadoIndisponivel recurso="..." />`
4. Registre a lacuna em `docs/api-gaps.md`

Não invente endpoint. Não deixe a tela de fora do app. Não use `mock` hardcoded em componente.

**Ao modelar DTO, seja permissivo; ao modelar domínio, seja rígido:**

```ts
// DTO — aceita a realidade
status: z.string().nullish()
// domínio — o app decide
status: StatusTreinamento
// mapper — a fronteira
STATUS.includes(v) ? v : 'pendente'
```

---

## 6. Convenções de código

- **Português** em nomes de domínio, arquivos de negócio, comentários e texto de UI. Inglês só no que é da plataforma (`useState`, `onPress`, `React`).
- **Componentes e tipos:** `PascalCase`. **Funções e variáveis:** `camelCase`. **Constantes:** `MAIUSCULA_COM_UNDERLINE`.
- **Arquivos:** componente e tela em `PascalCase.tsx`; hook em `useAlgo.ts`; service em `algoService.ts`.
- **Exportação nomeada.** `export default` só em `App.tsx`.
- **Sem `any`.** Dado externo entra como `unknown` e sai validado pelo Zod.
- **Estilo:** `StyleSheet.create` no fim do arquivo, constante chamada `estilos`.
- **Comentário explica *por quê*, não *o quê*.** `// GAP: /api/me não devolve permissões` é útil; `// busca os treinamentos` não é.
- **Imports por alias** (`@core`, `@shared`, `@features`, `@app`), nunca `../../..`.

---

## 7. Antes de abrir PR

```bash
npm run typecheck    # sem erro
npm start            # app sobe, login entra, cinco abas navegam
```

Checklist:

- [ ] Nenhum `axios`/`fetch` fora de `core/api`
- [ ] Nenhuma string de rota fora de `endpoints.ts`
- [ ] Todo dado novo tem DTO Zod + mapper
- [ ] Nenhum hex, `fontSize` mágico ou `padding` solto fora de `theme`
- [ ] Os quatro estados tratados
- [ ] Nada novo em `shared` sem dois consumidores
- [ ] Divergência de contrato registrada em `docs/api-gaps.md`
- [ ] Decisão arquitetural nova registrada em `docs/arquitetura.md` seção E

---

## 8. Como pedir bem (prompts que funcionam aqui)

**Ruim:** *"cria a tela de instrutores"* — não diz endpoint, campos, estados nem lugar.

**Bom:**
> Crie a feature `instrutores` seguindo `ai.md` §4.
> Endpoint: `GET /api/instrutores` (confira com curl antes de escrever o DTO).
> Lista com nome, especialidade, registro e chip interno/externo.
> Sem tela de detalhe nesta etapa.
> Reaproveite `ChipStatus` e `TelaBase`. Não crie componente em `shared`.

**Bom (mudança de contrato):**
> A API renomeou `cargaHoraria` para `duracaoHoras`.
> Ajuste apenas `treinamentos.dto.ts` e `treinamentos.mapper.ts`.
> Nenhuma tela deve mudar — se precisar mudar, o mapper está errado.

**Bom (endpoint inexistente):**
> Crie a tela de assinatura de presença. O endpoint de escrita não existe.
> Use `flags.assinaturaPresenca` (desligada), renderize `EstadoIndisponivel`
> e registre a lacuna em `docs/api-gaps.md`.

---

## 9. O que nunca fazer

| Não faça | Faça |
|---|---|
| `axios.get()` numa tela | `useX()` → `xService` → `httpClient` |
| Renderizar `dto.cargaHoraria` | `paraTreinamento(dto).cargaHoraria` |
| `catch { alert('erro') }` | Deixe o `AppError` subir e renderize `EstadoErro` |
| `backgroundColor: '#FFB100'` | `cores.sinal` |
| Criar `shared/components/CartaoQualquer` "para reusar depois" | Deixe na feature até existir o segundo uso |
| `as Treinamento` para calar o TypeScript | Corrija o schema Zod |
| Inventar endpoint que "deve existir" | Feature flag + `EstadoIndisponivel` + gap registrado |
| `console.log` no PR | Remova, ou use `AppError.detalhe` |
| Copiar a estrutura da API para dentro do app | Feature reflete o que o usuário faz (Regra 7) |
| Usar API só de nativo (SecureStore, Camera) sem checar `Platform` | O app roda na web em desenvolvimento: trate a plataforma em `core/`, nunca na tela |

---

## 10. Glossário

| Termo | Significado aqui |
|---|---|
| **Feature** | Funcionalidade do usuário. Não é tabela da API |
| **DTO** | Formato cru da API, validado por Zod |
| **Domínio** | Formato que o app usa. Definido em `types.ts` |
| **Mapper** | Fronteira DTO ↔ domínio. Absorve mudança de contrato |
| **Envelope** | `{ success, data }`. Some em `core/api` |
| **AppError** | Único tipo de erro visível acima de `core` |
| **Feature flag** | Interruptor de contrato que ainda não existe |
| **Linha de vida** | Componente-assinatura: trilho com pontos de ancoragem |
| **Ancorado** | Etapa cumprida com registro na API |
