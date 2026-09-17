import type { NavigatorScreenParams } from '@react-navigation/native';
export type RotasAuth={Login:undefined};
export type RotasTreinamentos={TreinamentosLista:undefined;TreinamentoDetalhe:{id:number};TreinamentoForm:{id?:number}|undefined};
export type RotasCertificados={CertificadosLista:undefined;CertificadoDetalhe:{id:number}};
export type RotasFuncionarios={FuncionariosLista:undefined;FuncionarioDetalhe:{id:number};FuncionarioForm:{id?:number}|undefined};
export type RotasMais={
  MaisInicio:undefined;
  InstrutoresLista:undefined; InstrutorDetalhe:{id:number}; InstrutorForm:{id?:number}|undefined;
  Usuarios:undefined; UsuarioForm:{id?:number}|undefined;
  Perfis:undefined; PerfilAcessoForm:{id?:number}|undefined;
  Permissoes:undefined; Auditoria:undefined; MeuPerfil:undefined;
};
export type RotasAbas={Painel:undefined;Treinamentos:NavigatorScreenParams<RotasTreinamentos>;Certificados:NavigatorScreenParams<RotasCertificados>;Funcionarios:NavigatorScreenParams<RotasFuncionarios>;Mais:NavigatorScreenParams<RotasMais>};
export type RotasRaiz={Autenticacao:NavigatorScreenParams<RotasAuth>;Aplicacao:NavigatorScreenParams<RotasAbas>};
declare global{namespace ReactNavigation{interface RootParamList extends RotasRaiz{}}}
