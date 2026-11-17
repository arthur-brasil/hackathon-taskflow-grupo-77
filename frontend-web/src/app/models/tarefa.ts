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

// Corpo enviado no POST e no PUT (sem o id)
export type TarefaRequest = Omit<Tarefa, 'id'>;

export const STATUS: { valor: Status; rotulo: string }[] = [
  { valor: 'PENDENTE', rotulo: 'Pendente' },
  { valor: 'EM_ANDAMENTO', rotulo: 'Em andamento' },
  { valor: 'CONCLUIDA', rotulo: 'Concluída' }
];

export const PRIORIDADES: { valor: Prioridade; rotulo: string }[] = [
  { valor: 'BAIXA', rotulo: 'Baixa' },
  { valor: 'MEDIA', rotulo: 'Média' },
  { valor: 'ALTA', rotulo: 'Alta' }
];
