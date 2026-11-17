import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import StatusBadge from '../components/StatusBadge';
import { RootStackParamList } from '../navigation';
import { buscarTarefa } from '../services/tarefaService';
import { PRIORIDADES, Tarefa } from '../types/tarefa';

type Props = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ route }: Props) {
  const { id } = route.params;
  const [tarefa, setTarefa] = useState<Tarefa | null>(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    buscarTarefa(id)
      .then(setTarefa)
      .catch((e: Error) => setErro(e.message));
  }, [id]);

  if (erro) {
    return <Text style={styles.erro}>{erro}</Text>;
  }
  if (!tarefa) {
    return <ActivityIndicator style={{ marginTop: 32 }} />;
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
  erro: { backgroundColor: '#fee2e2', color: '#991b1b', padding: 12, margin: 16, borderRadius: 8 },
});
