# Design System — versão integrada ao Figma

A interface atual substitui a identidade industrial amarela da primeira versão pela linguagem visual azul/slate criada no protótipo do Figma.

A fonte de verdade no código é `src/shared/theme/tokens.ts`.

## Cores principais

| Papel | Token | Valor |
|---|---|---|
| Primária | `sinal` | `#1D4ED8` |
| Primária escura | `sinalEscuro` | `#1E40AF` |
| Primária suave | `sinalSuave` | `#DBEAFE` |
| Texto principal | `grafite900` | `#0F172A` |
| Texto secundário | `aco500` | `#64748B` |
| Fundo | `neve100` | `#F1F5F9` |
| Superfície | `branco` | `#FFFFFF` |
| Borda | tom slate claro | `#E2E8F0` |

## Cores semânticas

- Sucesso: verde
- Atenção: âmbar
- Erro / destrutivo: vermelho
- Informação / ação: azul

Os chips de status usam essas cores semanticamente e não apenas como decoração.

## Tipografia

O projeto continua utilizando as fontes já instaladas no Expo para evitar dependências adicionais e preservar estabilidade. A hierarquia visual é feita por peso, tamanho e espaçamento.

## Componentes compartilhados

- `TopoTela`: cabeçalho consistente para módulos e detalhes.
- `AvatarNome`: avatar por iniciais, sem depender de campo de foto inexistente na API.
- `CartaoMenu`: itens da área Mais/Administração.
- `ChipStatus`: status semântico.
- `EstadoTela`: carregando, erro, vazio e conteúdo.
- `DialogoConfirmacao`: confirmação de ações destrutivas quando usado pelo fluxo.

Além deles, cada feature possui seus próprios cartões e elementos específicos.

## Navegação visual

A barra inferior possui cinco destinos:

- Painel
- Treinos
- Certificados
- Funcionários
- Mais

Recursos administrativos ficam agrupados em **Mais**, reduzindo poluição na navegação principal.

## Princípios

1. Priorizar leitura rápida em celular.
2. Evitar cards idênticos em excesso.
3. Usar chips para status e filtros.
4. Mostrar ações de criação por FAB quando fizer sentido.
5. Manter busca e filtros próximos da lista afetada.
6. Exibir ações destrutivas com linguagem visual de erro.
7. Garantir contraste e áreas de toque adequadas.
8. Não inventar foto, progresso ou informações que o Swagger não fornece.

## Estados

Toda tela de dados remotos deve prever pelo menos:

- carregando;
- conteúdo;
- vazio;
- erro;
- atualização/refresh quando aplicável.

Formulários também devem sinalizar envio, validação e falha da API.

## Relação com o Figma

O export do Figma era React Web. Nesta versão, o design foi reinterpretado com componentes nativos (`View`, `Text`, React Native Paper e React Navigation) em vez de transportar HTML/CSS diretamente.
