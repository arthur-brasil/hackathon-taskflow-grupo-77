import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import StatusBadge from '../components/StatusBadge';
import { RootStackParamList } from '../navigation';
import { alterarStatus, buscarTarefa } from '../services/tarefaService';
import { PRIORIDADES, STATUS, Status, Tarefa } from '../types/tarefa';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    buscarTarefa(id)
      .then(setTarefa)
      .catch((e: Error) => setErro(e.message));
  }, [id]);

  async function trocarStatus(novo: Status) {
    if (!tarefa || novo === tarefa.status) {
      return;
    }
    setSalvando(true);
    setMensagem('');
    try {
      await alterarStatus(tarefa.id, novo);
      // Busca de novo para mostrar exatamente o que ficou salvo na API
      setTarefa(await buscarTarefa(tarefa.id));
      setMensagem('Status atualizado.');
      setErro('');
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setSalvando(false);
    }
  }

  if (!tarefa) {
    return erro ? <Text style={styles.erro}>{erro}</Text> : <ActivityIndicator style={{ marginTop: 32 }} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.id}>Tarefa #{tarefa.id}</Text>
      <Text style={styles.titulo}>{tarefa.titulo}</Text>
      <StatusBadge status={tarefa.status} />

      <View style={styles.bloco}>
        <Text style={styles.rotulo}>Descrição</Text>
        <Text style={styles.valor}>{tarefa.descricao || 'Sem descrição'}</Text>
      </View>

      <View style={styles.linha}>
        <View style={[styles.bloco, styles.metade]}>
          <Text style={styles.rotulo}>Responsável</Text>
          <Text style={styles.valor}>{tarefa.responsavel}</Text>
        </View>
        <View style={[styles.bloco, styles.metade]}>
          <Text style={styles.rotulo}>Prioridade</Text>
          <Text style={styles.valor}>{PRIORIDADES[tarefa.prioridade]}</Text>
        </View>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.rotulo}>Alterar status</Text>
        <View style={styles.opcoes}>
          {STATUS.map((s) => {
            const atual = s.valor === tarefa.status;
            return (
              <Pressable
                key={s.valor}
                disabled={salvando}
                onPress={() => trocarStatus(s.valor)}
                style={({ pressed }) => [
                  styles.opcao,
                  atual && { backgroundColor: s.fundo, borderColor: s.cor },
                  pressed && styles.pressionado,
                ]}
              >
                <Text style={[styles.textoOpcao, atual && { color: s.cor }]}>{s.rotulo}</Text>
              </Pressable>
            );
          })}
        </View>
        {salvando ? <ActivityIndicator style={{ marginTop: 8 }} /> : null}
        {mensagem ? <Text style={styles.sucesso}>{mensagem}</Text> : null}
        {erro ? <Text style={styles.erroInline}>{erro}</Text> : null}
      </View>

      <Pressable
        onPress={() => navigation.popTo('Lista')}
        style={({ pressed }) => [styles.voltar, pressed && styles.pressionado]}
      >
        <Text style={styles.textoVoltar}>Voltar para a lista</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6fa' },
  conteudo: { padding: 16, gap: 12 },
  id: { color: '#98a2b3', fontSize: 13 },
  titulo: { fontSize: 22, fontWeight: '700', color: '#101828' },
  linha: { flexDirection: 'row', gap: 12 },
  bloco: { backgroundColor: '#fff', borderRadius: 10, padding: 14, gap: 4, borderWidth: 1, borderColor: '#eef0f3' },
  metade: { flex: 1 },
  rotulo: { fontSize: 12, fontWeight: '600', color: '#667085' },
  valor: { fontSize: 15, color: '#101828' },
  opcoes: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6 },
  opcao: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d0d5dd',
    backgroundColor: '#fff',
  },
  pressionado: { opacity: 0.6 },
  textoOpcao: { fontWeight: '600', color: '#344054' },
  voltar: { backgroundColor: '#1d4ed8', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  textoVoltar: { color: '#fff', fontWeight: '600', fontSize: 15 },
  sucesso: { color: '#166534', marginTop: 8 },
  erroInline: { color: '#991b1b', marginTop: 8 },
  erro: { backgroundColor: '#fee2e2', color: '#991b1b', padding: 12, margin: 16, borderRadius: 8 },
});
