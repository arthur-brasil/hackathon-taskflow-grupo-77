# TaskFlow — frontend web (Angular)

Interface web do TaskFlow: lista as tarefas da API, filtra por status, cadastra, edita e exclui.

## Como rodar

Com o backend rodando em `http://localhost:8080`:

```bash
npm install
npm start
```

Abrir http://localhost:4200.

## Testes

```bash
npm test
```

## Organização

- `src/app/models/tarefa.ts`: tipos da tarefa, status e prioridades
- `src/app/services/tarefa.service.ts`: chamadas HTTP para `/api/tarefas`
- `src/app/components/tarefa-lista`: tabela com filtro por status, editar e excluir
- `src/app/components/tarefa-form`: formulário de cadastro e edição
- `src/app/app.ts`: junta os componentes e trata as respostas da API
