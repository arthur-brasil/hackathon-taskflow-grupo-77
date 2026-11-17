import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

const API = 'http://localhost:8080/api/tarefas';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
  });

  it('lista as tarefas que vêm da API e filtra por status', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    TestBed.inject(HttpTestingController).expectOne(API).flush([
      { id: 1, titulo: 'Tarefa A', descricao: null, responsavel: 'Arthur', status: 'PENDENTE', prioridade: 'ALTA' },
      { id: 2, titulo: 'Tarefa B', descricao: null, responsavel: 'Lucas', status: 'CONCLUIDA', prioridade: 'BAIXA' }
    ]);
    await fixture.whenStable();

    const tela = fixture.nativeElement as HTMLElement;
    expect(tela.querySelectorAll('tbody tr').length).toBe(2);

    const botaoConcluida = Array.from(tela.querySelectorAll('.filtros button'))
      .find(b => b.textContent?.includes('Concluída')) as HTMLButtonElement;
    botaoConcluida.click();
    await fixture.whenStable();

    expect(tela.querySelectorAll('tbody tr').length).toBe(1);
    expect(tela.querySelector('tbody')?.textContent).toContain('Tarefa B');
  });

  it('mostra as mensagens de validação que a API devolve no 400', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const http = TestBed.inject(HttpTestingController);
    http.expectOne(API).flush([]);
    await fixture.whenStable();

    const tela = fixture.nativeElement as HTMLElement;
    (tela.querySelector('button[type=submit]') as HTMLButtonElement).click();

    const post = http.expectOne({ method: 'POST', url: API });
    post.flush({ status: 400, erros: ['O título é obrigatório'] }, { status: 400, statusText: 'Bad Request' });
    await fixture.whenStable();

    expect(tela.querySelector('.erros')?.textContent).toContain('O título é obrigatório');
  });
});
