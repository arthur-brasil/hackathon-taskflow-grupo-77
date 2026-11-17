import { StyleSheet, Text } from 'react-native';

import { Status, infoStatus } from '../types/tarefa';

export default function StatusBadge({ status }: { status: Status }) {
  const info = infoStatus(status);
  return (
    <Text style={[styles.badge, { color: info.cor, backgroundColor: info.fundo }]}>
      {info.rotulo}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
});
