/** Formatação de datas ISO vindas da API. Sem dependência externa. */

export function formatarData(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatarDataHora(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return `${formatarData(iso)} às ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
}

export function formatarPeriodo(inicio?: string | null, fim?: string | null): string {
  if (!inicio) return '—';
  const mesmoDia = fim && new Date(inicio).toDateString() === new Date(fim).toDateString();
  return mesmoDia ? formatarData(inicio) : `${formatarData(inicio)} – ${formatarData(fim)}`;
}

export function diasAte(iso?: string | null): number | null {
  if (!iso) return null;
  const alvo = new Date(iso).getTime();
  if (Number.isNaN(alvo)) return null;
  return Math.ceil((alvo - Date.now()) / 86_400_000);
}
