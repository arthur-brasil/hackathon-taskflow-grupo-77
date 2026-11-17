export type Status = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
export type Prioridade = 'BAIXA' | 'MEDIA' | 'ALTA';

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string | null;
  responsavel: string;
  status: Status;
  prioridade: Prioridade;
}

export const STATUS: { valor: Status; rotulo: string; cor: string; fundo: string }[] = [
  { valor: 'PENDENTE', rotulo: 'Pendente', cor: '#92400e', fundo: '#fef3c7' },
  { valor: 'EM_ANDAMENTO', rotulo: 'Em andamento', cor: '#1e40af', fundo: '#dbeafe' },
  { valor: 'CONCLUIDA', rotulo: 'Concluída', cor: '#166534', fundo: '#dcfce7' },
];

export const PRIORIDADES: Record<Prioridade, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta',
};

export function infoStatus(status: Status) {
  return STATUS.find((s) => s.valor === status) ?? STATUS[0];
}
