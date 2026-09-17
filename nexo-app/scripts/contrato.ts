/**
 * Teste de contrato: bate os schemas Zod e os mappers contra a API REAL.
 *
 * A API não está finalizada — este script é o alarme de quando ela mudar.
 * Rode com a Mock API no ar:  npm run test:contrato
 */
import { z } from 'zod';
import { envelopeSucesso } from '@core/api/envelope';
import { loginRespostaDto, meRespostaDto } from '@features/auth/services/auth.dto';
import { paraUsuarioLogado, paraUsuarioMinimo } from '@features/auth/services/auth.mapper';
import { resumoPainelDto } from '@features/dashboard/services/dashboard.dto';
import { paraResumoPainel, paraIndicadores } from '@features/dashboard/services/dashboard.mapper';
import { listaTreinamentosDto, treinamentoCompletoDto } from '@features/treinamentos/services/treinamentos.dto';
import { paraTreinamento, paraTreinamentoDetalhado } from '@features/treinamentos/services/treinamentos.mapper';
import { listaCertificadosDto, certificadoCompletoDto } from '@features/certificados/services/certificados.dto';
import { paraCertificado, paraCertificadoDetalhado } from '@features/certificados/services/certificados.mapper';

const BASE = 'http://localhost:3000';
let falhas = 0;

async function checar<S extends z.ZodTypeAny>(nome: string, caminho: string, schema: S, mapper: (d: z.output<S>) => unknown, init?: RequestInit) {
  try {
    const r = await fetch(BASE + caminho, init);
    const bruto = await r.json();
    const { data } = envelopeSucesso.parse(bruto);
    const dto = schema.parse(data);
    const dominio = mapper(dto);
    console.log(`OK   ${nome}\n     ${JSON.stringify(dominio).slice(0, 190)}`);
  } catch (e: any) {
    falhas++;
    console.log(`FALHA ${nome}\n     ${e.message?.slice(0, 400)}`);
  }
}

(async () => {
  const post = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'carlo.souza@empresa.com', senha: 'senhaSegura123' }) };
  await checar('POST /api/login', '/api/login', loginRespostaDto, (d) => paraUsuarioMinimo(d.usuario), post);
  await checar('GET  /api/me', '/api/me', meRespostaDto, paraUsuarioLogado);
  await checar('GET  /api/dashboard', '/api/dashboard', resumoPainelDto, (d) => paraIndicadores(paraResumoPainel(d)));
  await checar('GET  /api/treinamentos', '/api/treinamentos?_sort=dataInicio&_order=desc&_page=1&_limit=20', listaTreinamentosDto, (d) => d.map(paraTreinamento));
  await checar('GET  /api/treinamentos?q=', '/api/treinamentos?q=NR-35', listaTreinamentosDto, (d) => d.map(paraTreinamento));
  await checar('GET  /api/treinamentos/1/completo', '/api/treinamentos/1/completo', treinamentoCompletoDto, paraTreinamentoDetalhado);
  await checar('GET  /api/certificados', '/api/certificados?_sort=dataEmissao&_order=desc', listaCertificadosDto, (d) => d.map(paraCertificado));
  await checar('GET  /api/certificados/1/completo', '/api/certificados/1/completo', certificadoCompletoDto, paraCertificadoDetalhado);
  console.log(falhas === 0 ? '\n>>> CONTRATO OK: 8/8' : `\n>>> ${falhas} FALHA(S)`);
})();
