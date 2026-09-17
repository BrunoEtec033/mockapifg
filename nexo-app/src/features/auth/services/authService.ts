import { endpoints, httpClient } from '@core/api';
import { sessionStorage } from '@core/storage';
import { Credenciais, Sessao, UsuarioLogado } from '../types';
import { loginRespostaDto, meRespostaDto } from './auth.dto';
import { paraUsuarioLogado, paraUsuarioMinimo } from './auth.mapper';

/**
 * Única porta de entrada da feature auth para a API.
 * Não conhece React; não conhece navegação.
 */
export const authService = {
  /**
   * ATENÇÃO: hoje a Mock API ignora e-mail/senha e devolve sempre usuarios[0].
   * O app já envia as credenciais no formato final para não precisar mudar
   * quando a validação for implementada (flags.loginValidaCredenciais).
   */
  async entrar(credenciais: Credenciais): Promise<Sessao> {
    const dto = await httpClient.post(endpoints.auth.login, loginRespostaDto, credenciais);
    const sessao: Sessao = {
      token: dto.token,
      refreshToken: dto.refreshToken ?? null,
      usuario: paraUsuarioMinimo(dto.usuario),
    };
    await sessionStorage.salvar({
      token: sessao.token,
      refreshToken: sessao.refreshToken,
      permissoes: sessao.usuario.permissoes,
    });
    return sessao;
  },

  /** Perfil completo do usuário autenticado (nome, cargo, perfis). */
  async carregarUsuario(): Promise<UsuarioLogado> {
    const dto = await httpClient.get(endpoints.auth.me, meRespostaDto);
    const usuario = paraUsuarioLogado(dto);
    const sessao = await sessionStorage.carregar();
    if (sessao) {
      await sessionStorage.salvar({ ...sessao, permissoes: usuario.permissoes });
    }
    return usuario;
  },

  async sair(): Promise<void> {
    // GAP: não existe POST /api/logout. Encerramos apenas no cliente.
    await sessionStorage.limpar();
  },

  async temSessaoSalva(): Promise<boolean> {
    return (await sessionStorage.carregar()) !== null;
  },
};
