import { Button, Dialog, Portal, Text } from 'react-native-paper';

export function DialogoConfirmacao({
  visivel,
  titulo,
  mensagem,
  confirmar = 'Excluir',
  aoCancelar,
  aoConfirmar,
  processando = false,
}: {
  visivel: boolean;
  titulo: string;
  mensagem: string;
  confirmar?: string;
  aoCancelar: () => void;
  aoConfirmar: () => void;
  processando?: boolean;
}) {
  return (
    <Portal>
      <Dialog visible={visivel} onDismiss={processando ? undefined : aoCancelar}>
        <Dialog.Title>{titulo}</Dialog.Title>
        <Dialog.Content><Text variant="bodyMedium">{mensagem}</Text></Dialog.Content>
        <Dialog.Actions>
          <Button onPress={aoCancelar} disabled={processando}>Cancelar</Button>
          <Button onPress={aoConfirmar} loading={processando} disabled={processando} textColor="#DC2626">{confirmar}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
