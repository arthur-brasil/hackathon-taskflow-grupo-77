import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PRIORIDADES, STATUS, Tarefa, TarefaRequest } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-form',
  imports: [FormsModule],
  templateUrl: './tarefa-form.html',
  styleUrl: './tarefa-form.css'
})
export class TarefaForm {
  // Tarefa em edição (null = cadastro novo)
  readonly tarefa = input<Tarefa | null>(null);
  readonly erros = input<string[]>([]);

  readonly salvar = output<TarefaRequest>();
  readonly cancelar = output<void>();

  protected readonly status = STATUS;
  protected readonly prioridades = PRIORIDADES;

  protected form: TarefaRequest = this.formVazio();

  constructor() {
    // Sempre que a tarefa em edição mudar, preenche (ou limpa) o formulário
    effect(() => {
      const t = this.tarefa();
      this.form = t
        ? { titulo: t.titulo, descricao: t.descricao, responsavel: t.responsavel, status: t.status, prioridade: t.prioridade }
        : this.formVazio();
    });
  }

  enviar(): void {
    this.salvar.emit({ ...this.form, descricao: this.form.descricao?.trim() || null });
  }

  limpar(): void {
    this.resetar();
    this.cancelar.emit();
  }

  // Chamado pelo App depois que a API confirma o cadastro
  resetar(): void {
    this.form = this.formVazio();
  }

  private formVazio(): TarefaRequest {
    return { titulo: '', descricao: '', responsavel: '', status: 'PENDENTE', prioridade: 'MEDIA' };
  }
}
