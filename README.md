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

| Método | Rota | Operação |
|---|---|---|
| GET | /api/tarefas | Listar |
| GET | /api/tarefas/{id} | Consultar por ID |
| POST | /api/tarefas | Cadastrar |
| PUT | /api/tarefas/{id} | Editar |
| PATCH | /api/tarefas/{id}/status | Alterar status |
| DELETE | /api/tarefas/{id} | Excluir |

## Como rodar

> Instruções completadas durante o hackathon.

1. **Backend:** `cd backend` e `./mvnw spring-boot:run` (porta 8080).
2. **Angular:** `cd frontend-web`, `npm install` e `npm start` (http://localhost:4200).
3. **Expo:** `cd frontend-mobile`, `npm install` e `npx expo start`. No celular, a API precisa ser acessada pelo IP do computador na rede (ex.: `http://192.168.0.10:8080`), não por `localhost`.

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
