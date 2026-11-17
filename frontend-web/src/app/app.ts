import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TarefaForm } from './components/tarefa-form/tarefa-form';
import { TarefaLista } from './components/tarefa-lista/tarefa-lista';
import { Tarefa, TarefaRequest } from './models/tarefa';
import { TarefaService } from './services/tarefa.service';

@Component({
  selector: 'app-root',
  imports: [TarefaLista, TarefaForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly service = inject(TarefaService);
  private readonly formulario = viewChild.required(TarefaForm);

  protected readonly tarefas = signal<Tarefa[]>([]);
  protected readonly emEdicao = signal<Tarefa | null>(null);
  protected readonly errosForm = signal<string[]>([]);
  protected readonly erro = signal('');
  protected readonly mensagem = signal('');

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.service.getAll().subscribe({
      next: lista => {
        this.tarefas.set(lista);
        this.erro.set('');
      },
      error: () => this.erro.set('Não foi possível conectar à API em http://localhost:8080.')
    });
  }

  salvar(tarefa: TarefaRequest): void {
    this.errosForm.set([]);
    this.mensagem.set('');
    const editando = this.emEdicao();

    const requisicao: Observable<unknown> = editando
      ? this.service.update(editando.id, tarefa)
      : this.service.create(tarefa);

    requisicao.subscribe({
      next: () => {
        this.mensagem.set(editando ? 'Tarefa atualizada.' : 'Tarefa cadastrada.');
        this.emEdicao.set(null);
        this.formulario().resetar();
        this.carregar();
      },
      error: (e: HttpErrorResponse) => this.errosForm.set(this.lerErros(e))
    });
  }

  editar(tarefa: Tarefa): void {
    this.emEdicao.set(tarefa);
    this.errosForm.set([]);
    this.mensagem.set('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicao(): void {
    this.emEdicao.set(null);
    this.errosForm.set([]);
  }

  excluir(tarefa: Tarefa): void {
    this.mensagem.set('');
    this.service.delete(tarefa.id).subscribe({
      next: () => {
        this.mensagem.set(`Tarefa "${tarefa.titulo}" excluída.`);
        if (this.emEdicao()?.id === tarefa.id) {
          this.emEdicao.set(null);
        }
        this.carregar();
      },
      error: (e: HttpErrorResponse) => this.erro.set(this.lerErros(e).join(' '))
    });
  }

  // A API devolve { status: 400, erros: [...] } ou { status: 404, mensagem: '...' }
  private lerErros(e: HttpErrorResponse): string[] {
    if (e.status === 0) {
      return ['Não foi possível conectar à API em http://localhost:8080.'];
    }
    if (Array.isArray(e.error?.erros)) {
      return e.error.erros;
    }
    if (e.error?.mensagem) {
      return [e.error.mensagem];
    }
    return [`Erro ${e.status} ao falar com a API.`];
  }
}
