import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ehMock } from '@core/config';
import { cores, espaco, raio, semantica, tipografia } from '@shared/theme';
import { useLogin } from '../hooks/useLogin';

export function LoginScreen() {
  const { email, setEmail, senha, setSenha, enviando, erro, erroCampo, enviar } = useLogin();
  const insets = useSafeAreaInsets();
  return (
    <><StatusBar style="light" /><KeyboardAvoidingView style={e.tela} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={e.conteudo} keyboardShouldPersistTaps="handled">
        <View style={[e.hero,{paddingTop:insets.top+42}]}> 
          <View style={e.marca}><View style={e.icone}><Text style={e.livro}>▤</Text></View><Text style={e.corporativo}>NEXO</Text></View>
          <Text style={e.tituloHero}>Gestão de{`\n`}Treinamentos</Text>
          <Text style={e.subHero}>Capacitação e desenvolvimento profissional</Text>
        </View>
        <View style={e.formWrap}>
          <Text style={e.tituloForm}>Entrar na conta</Text>
          <Text style={e.subForm}>Use suas credenciais corporativas</Text>
          <TextInput mode="outlined" label="E-mail" placeholder="seu@empresa.com" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" error={!!erroCampo.email} disabled={enviando} style={e.campo}/>
          <HelperText type="error" visible={!!erroCampo.email}>{erroCampo.email}</HelperText>
          <TextInput mode="outlined" label="Senha" value={senha} onChangeText={setSenha} secureTextEntry error={!!erroCampo.senha} disabled={enviando} style={e.campo}/>
          <HelperText type="error" visible={!!erroCampo.senha}>{erroCampo.senha}</HelperText>
          {!!erro && <View style={e.erroBox}><Text style={e.erro}>{erro.message}</Text></View>}
          <Button mode="contained" onPress={enviar} loading={enviando} disabled={enviando} contentStyle={e.botaoConteudo} style={e.botao}>Entrar</Button>
          {ehMock && <View style={e.demo}><Text style={e.demoTitulo}>Credenciais de demonstração</Text><Text style={e.demoTexto}>A Mock API aceita qualquer e-mail e senha válidos e autentica o primeiro usuário do banco.</Text></View>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView></>
  );
}
const e=StyleSheet.create({tela:{flex:1,backgroundColor:semantica.fundo},conteudo:{flexGrow:1},hero:{backgroundColor:cores.sinal,paddingHorizontal:espaco.lg,paddingBottom:52},marca:{flexDirection:'row',alignItems:'center',gap:espaco.sm,marginBottom:espaco.lg},icone:{width:42,height:42,borderRadius:raio.medio,backgroundColor:'rgba(255,255,255,.16)',alignItems:'center',justifyContent:'center'},livro:{fontSize:24,color:'#FFF'},corporativo:{...tipografia.etiqueta,color:'rgba(255,255,255,.72)',letterSpacing:1.6},tituloHero:{...tipografia.display,fontSize:32,lineHeight:37,color:'#FFF'},subHero:{...tipografia.apoio,color:'rgba(255,255,255,.72)',marginTop:espaco.xs},formWrap:{flex:1,marginTop:-20,borderTopLeftRadius:26,borderTopRightRadius:26,backgroundColor:semantica.fundo,padding:espaco.lg,paddingTop:espaco.xl},tituloForm:{...tipografia.titulo,color:semantica.texto},subForm:{...tipografia.apoio,color:semantica.textoSecundario,marginTop:2,marginBottom:espaco.md},campo:{backgroundColor:semantica.fundoElevado},botao:{borderRadius:raio.medio,marginTop:espaco.xs},botaoConteudo:{paddingVertical:5},erroBox:{backgroundColor:cores.riscoSuave,borderRadius:raio.medio,padding:espaco.sm,marginBottom:espaco.xs},erro:{...tipografia.apoio,color:cores.risco},demo:{backgroundColor:cores.sinalSuave,borderRadius:raio.medio,padding:espaco.md,marginTop:espaco.lg,borderWidth:1,borderColor:'#BFDBFE'},demoTitulo:{...tipografia.apoio,fontFamily:'IBMPlexSans_600SemiBold',color:cores.sinalEscuro},demoTexto:{...tipografia.apoio,fontSize:11,color:cores.sinalEscuro,marginTop:3}});