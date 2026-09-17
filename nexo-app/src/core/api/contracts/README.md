# Contratos gerados

`openapi.d.ts` é **gerado**, nunca editado à mão:

```bash
npm run api:types
```

O arquivo nasce do `swagger/openapi.json` da Mock API — o mesmo arquivo que é
enviado ao Figma para gerar as telas. Um contrato, dois consumidores: tipos no
app e layout no design.

Enquanto a API não estiver finalizada, os schemas Zod de cada feature
(`features/*/services/*.dto.ts`) são a fonte de verdade em runtime; os tipos
gerados servem de conferência em tempo de compilação. Divergência entre os dois
= item para `docs/api-gaps.md`.
