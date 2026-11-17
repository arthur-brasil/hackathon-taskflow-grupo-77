# TaskFlow — Hackathon Full Stack (grupo 77)

Gerenciador de tarefas compartilhadas: uma API Java Spring Boot consumida por uma aplicação web Angular e por um aplicativo mobile Expo.

FATEC Itu — ADS AMS — Java Spring, prof. Glauco Todesco.

## Integrantes

| Integrante | GitHub | Responsabilidade |
|---|---|---|
| Arthur Brasil | [@arthur-brasil](https://github.com/arthur-brasil) | API Java Spring Boot e H2 |
| Lucas Lonardi | [@Lucaslonardi](https://github.com/Lucaslonardi) | Interface Angular |
| Sophia | [@winter717](https://github.com/winter717) | Aplicativo Expo |

Integração, testes e este README são divididos entre os três.

## Estrutura

```
hackathon-taskflow-grupo-77/
├── backend/          # API Java Spring Boot + H2
├── frontend-web/     # Angular
├── frontend-mobile/  # Expo / React Native
├── README.md
└── .gitignore
```

## URL da API

`http://localhost:8080/api/tarefas`

| Método | Rota | Operação | Respostas |
|---|---|---|---|
| GET | /api/tarefas | Listar | 200 |
| GET | /api/tarefas/{id} | Consultar por ID | 200, 404 |
| POST | /api/tarefas | Cadastrar | 201 (com `Location`), 400 |
| PUT | /api/tarefas/{id} | Editar | 204, 400, 404 |
| PATCH | /api/tarefas/{id}/status | Alterar status | 204, 400, 404 |
| DELETE | /api/tarefas/{id} | Excluir | 204, 404 |

Exemplo de corpo do POST/PUT:

```json
{
  "titulo": "Criar tela de login",
  "descricao": "Opcional",
  "responsavel": "Lucas",
  "status": "PENDENTE",
  "prioridade": "ALTA"
}
```

- `titulo` e `responsavel` são obrigatórios; `status` aceita `PENDENTE`, `EM_ANDAMENTO` ou `CONCLUIDA`; `prioridade` aceita `BAIXA`, `MEDIA` ou `ALTA`.
- O PATCH recebe só `{ "status": "CONCLUIDA" }`.
- Erro de validação: `400` com `{ "status": 400, "erros": ["O título é obrigatório", ...] }`. Id inexistente: `404` com `{ "status": 404, "mensagem": "Tarefa não encontrada" }`.

## Pré-requisitos

- Java 25 (o Maven vem junto, pelo `mvnw`)
- Node.js 20 ou mais novo
- Para testar no celular: app **Expo Go** instalado e o celular no mesmo Wi-Fi do computador

## Como rodar

Abra três terminais, um para cada parte. O backend precisa subir primeiro.

### 1. Backend (Java Spring Boot + H2)

```bash
cd backend
./mvnw spring-boot:run
```

No Windows (cmd/PowerShell) use `mvnw spring-boot:run`.

- API em http://localhost:8080/api/tarefas, já com 4 tarefas de exemplo (`data.sql`).
- Console do banco em http://localhost:8080/h2-console — JDBC URL `jdbc:h2:mem:taskflow`, usuário `sa`, sem senha.
- O banco é em memória: ao reiniciar o backend, os dados voltam às tarefas de exemplo.

### 2. Frontend web (Angular)

```bash
cd frontend-web
npm install
npm start
```

Abrir http://localhost:4200.

### 3. App mobile (Expo)

```bash
cd frontend-mobile
npm install
npx expo start
```

- **No navegador:** aperte `w` no terminal (abre em http://localhost:8081).
- **No celular (Expo Go):** o celular não enxerga o `localhost` do computador. Copie `frontend-mobile/.env.example` para `frontend-mobile/.env` e troque o IP pelo do computador (no Windows, `ipconfig` → "Endereço IPv4"):

  ```
  EXPO_PUBLIC_API_URL=http://192.168.0.10:8080
  ```

  Depois rode `npx expo start` de novo e leia o QR code com o Expo Go. Se não conectar, libere a porta 8080 no Firewall do Windows para rede privada.
- **No emulador Android:** funciona sem `.env` (o app usa `http://10.0.2.2:8080`).

## Testes

```bash
cd backend && ./mvnw test          # 8 testes das rotas da API (MockMvc)
cd frontend-web && npm test        # listagem, filtro e mensagens de validação
cd frontend-mobile && npx tsc --noEmit   # checagem de tipos do app
```

## Demonstração do fluxo integrado

1. **Angular:** cadastrar uma tarefa (ex.: "Demo da integração", status Pendente).
2. **Expo:** puxar a lista para atualizar — a tarefa aparece; tocar nela para abrir os detalhes.
3. **Expo:** em "Alterar status", tocar em **Concluída** (o app faz `PATCH /api/tarefas/{id}/status`).
4. **Angular:** clicar em **Atualizar** — a tarefa aparece como Concluída (dá para conferir com o filtro "Concluída").

## Funcionalidades

| Parte | O que faz |
|---|---|
| API | CRUD completo + alteração de status, validação (400), 404, CORS para `localhost:4200` e `localhost:8081`, camadas Entity / Repository / Service / Controller, DTOs e mapper |
| Angular | Lista com filtro por status, cadastro, edição e exclusão com confirmação, mensagens de erro da API. Componentes `tarefa-lista` e `tarefa-form` + `TarefaService` (HttpClient) |
| Expo | Tela de lista (puxar para atualizar), tela de detalhes, troca de status, navegação em pilha (React Navigation), consumo com `fetch` |

## Como trabalhamos

- `main` é a versão oficial e está protegida: nada de commit direto, tudo entra por Pull Request aprovado por outro integrante.
- Uma branch por funcionalidade: `feat/api-tarefas`, `feat/angular-listagem`, `feat/expo-status`...
- Cada PR tem título, descrição e `Closes #n` da issue.
- Commits com emoji, tipo e descrição objetiva:
  - `:sparkles: feat: Implementa API de tarefas`
  - `:bug: fix: Corrige atualização de status`
  - `:books: docs: Atualiza instruções do README`
  - `:test_tube: test: Adiciona teste de serviço`
- Board: [GitHub Project](https://github.com/users/arthur-brasil/projects/3) com as colunas A fazer, Em andamento e Concluído.
