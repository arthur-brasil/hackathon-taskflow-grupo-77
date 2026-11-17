# TaskFlow — app mobile (Expo)

App do TaskFlow: lista as tarefas da API, mostra os detalhes e altera o status.

## Como rodar

Com o backend rodando na porta 8080:

```bash
npm install
npx expo start
```

- **Navegador:** aperte `w` (abre em http://localhost:8081).
- **Celular (Expo Go):** o celular e o computador precisam estar no mesmo Wi-Fi. Copie `.env.example` para `.env`, troque o IP pelo IP do computador (`ipconfig`, linha "Endereço IPv4"), rode `npx expo start` de novo e leia o QR code.
- **Emulador Android:** funciona sem `.env` (usa `10.0.2.2`).

## Organização

- `App.tsx`: navegação em pilha (Lista → Detalhes)
- `src/screens/ListaScreen.tsx`: lista com puxar para atualizar; recarrega ao voltar dos detalhes
- `src/screens/DetalhesScreen.tsx`: detalhes da tarefa e troca de status (PATCH)
- `src/services/tarefaService.ts`: chamadas `fetch` para `/api/tarefas`
- `src/components/StatusBadge.tsx`: etiqueta colorida do status
