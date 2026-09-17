# Integração do front gerado pelo Figma

O arquivo `Read Training Management.zip` foi usado como referência visual e funcional. Ele era um projeto React/Vite para navegador; por isso **não foi copiado diretamente** para o app. As telas foram portadas para React Native + Expo e conectadas à arquitetura já existente (`Screen -> Hook -> Service -> API`).

## Telas portadas/organizadas

- Login
- Painel
- Treinamentos: lista, detalhe e formulário
- Funcionários: lista, detalhe e formulário
- Instrutores: lista, detalhe e formulário
- Certificados: lista e detalhe
- Menu / Mais
- Usuários: lista e formulário
- Perfis de acesso: lista e formulário
- Permissões
- Auditoria
- Meu perfil

## Navegação final

Bottom tabs: `Painel | Treinos | Certificados | Funcionários | Mais`.

A aba **Mais** contém Instrutores, Usuários, Perfis de Acesso, Permissões, Auditoria e Meu Perfil.

## Fonte de verdade

O Swagger que veio com o front do Figma está salvo em `docs/openapi.json`. Os serviços usam as rotas reais da Mock API; os dados de `src/data/mock.ts` do projeto Vite **não foram trazidos para o app**, evitando uma segunda fonte de dados falsa.

## Correções de contrato feitas na integração

- status de treinamento alinhado ao Swagger: `pendente | em_andamento | concluido | cancelado`;
- status de participante alinhado ao Swagger: `pendente | aprovado | reprovado`;
- status de certificado alinhado ao Swagger: `valido | expirado | cancelado`;
- catálogo `src/core/api/endpoints.ts` ampliado para todas as rotas publicadas no OpenAPI;
- treinamento completo inclui também as assinaturas, carregadas do endpoint de assinaturas;
- detalhes de funcionário e instrutor cruzam vínculos reais da API para montar histórico.

## Observação sobre CRUD

O front do Figma tinha algumas ações apenas simuladas. Nesta integração, cadastro/edição/exclusão de Treinamentos, Funcionários e Instrutores e as ações administrativas implementadas passam pelos serviços HTTP reais da Mock API.
