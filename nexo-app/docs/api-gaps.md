# Observações e limitações da Mock API

Este arquivo descreve limitações do ambiente mock que ainda importam para o aplicativo integrado.

## O que o Swagger já cobre

O contrato atual possui rotas para autenticação, dashboard e CRUD/consulta dos principais recursos: funcionários, instrutores, usuários, perfis, permissões, relações de acesso, treinamentos, responsáveis, instrutores de treinamento, participantes, assinaturas, evidências, certificados e auditorias.

Portanto, esses módulos não devem mais ser tratados como inexistentes.

## Limitações do mock

### 1. Login é simulado

A Mock API devolve token de teste e não representa autenticação de produção. O aplicativo preserva a camada de sessão como se o token fosse real para facilitar a troca futura.

### 2. Upload físico de evidência

Existe recurso de evidência no contrato, porém o mock não representa necessariamente um fluxo real de upload multipart/armazenamento de arquivo. A interface deve distinguir cadastro de metadados de um upload binário real.

### 3. Assinatura real

O recurso `assinaturas` existe, mas captura biométrica, desenho de assinatura ou assinatura eletrônica juridicamente validada não está definida pelo Swagger do mock. O app pode listar/representar registros, mas não deve prometer mecanismo criptográfico que o contrato não define.

### 4. Permissões e segurança

O mock ajuda a demonstrar RBAC, mas não substitui autorização real no servidor. Ocultar botão no app não é segurança; a API real deve validar permissões em cada operação.

### 5. Paginação e filtros

Alguns recursos usam comportamento genérico do json-server. A API real pode adotar outro formato de paginação, totalizadores e erros. Services/mappers existem justamente para isolar essa mudança.

### 6. Dados derivados

Algumas informações visuais, como quantidade de dias para o vencimento de certificado, são calculadas pelo cliente. Elas não devem ser tratadas como campos persistidos se não estiverem no Swagger.

## Regra para evolução

Quando o backend real mudar o contrato:

1. atualizar `docs/openapi.json`;
2. ajustar DTO/schema Zod;
3. ajustar mapper/service;
4. manter a Screen consumindo o mesmo modelo de domínio sempre que possível.
