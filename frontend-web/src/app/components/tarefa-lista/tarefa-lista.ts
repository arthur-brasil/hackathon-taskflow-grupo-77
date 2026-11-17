import { Component, computed, input, output, signal } from '@angular/core';

import { PRIORIDADES, STATUS, Status, Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.html',
  styleUrl: './tarefa-lista.css'
})
export class TarefaLista {
  readonly tarefas = input.required<Tarefa[]>();
  readonly editar = output<Tarefa>();
  readonly excluir = output<Tarefa>();

  protected readonly status = STATUS;
  protected readonly filtro = signal<Status | 'TODAS'>('TODAS');

  // Id da tarefa que está pedindo confirmação de exclusão
  protected readonly confirmando = signal<number | null>(null);

  protected confirmarExclusao(t: Tarefa): void {
    this.confirmando.set(null);
    this.excluir.emit(t);
  }

  // Lista que aparece na tela, já filtrada pelo status escolhido
  protected readonly visiveis = computed(() => {
    const filtro = this.filtro();
    return filtro === 'TODAS'
      ? this.tarefas()
      : this.tarefas().filter(t => t.status === filtro);
  });

  protected quantidade(status: Status | 'TODAS'): number {
    return status === 'TODAS'
      ? this.tarefas().length
      : this.tarefas().filter(t => t.status === status).length;
  }

  protected rotuloStatus(valor: Status): string {
    return STATUS.find(s => s.valor === valor)?.rotulo ?? valor;
  }

  protected rotuloPrioridade(valor: string): string {
    return PRIORIDADES.find(p => p.valor === valor)?.rotulo ?? valor;
  }
}
