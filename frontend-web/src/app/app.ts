import { Component, OnInit, inject, signal } from '@angular/core';

import { TarefaLista } from './components/tarefa-lista/tarefa-lista';
import { Tarefa } from './models/tarefa';
import { TarefaService } from './services/tarefa.service';

@Component({
  selector: 'app-root',
  imports: [TarefaLista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly service = inject(TarefaService);

  protected readonly tarefas = signal<Tarefa[]>([]);
  protected readonly erro = signal('');

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
}
