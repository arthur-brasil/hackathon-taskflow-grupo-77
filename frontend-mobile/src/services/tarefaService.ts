import { Platform } from 'react-native';

import { Tarefa } from '../types/tarefa';

// No celular, "localhost" é o próprio celular: use o IP do computador na rede,
// colocando EXPO_PUBLIC_API_URL=http://SEU_IP:8080 no arquivo .env (veja o .env.example).
// No emulador Android, 10.0.2.2 aponta para o computador.
const URL_PADRAO = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';

export const API_URL = `${process.env.EXPO_PUBLIC_API_URL ?? URL_PADRAO}/api/tarefas`;

async function verificar(resposta: Response): Promise<Response> {
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => null);
    const mensagem = corpo?.erros?.join('\n') ?? corpo?.mensagem ?? `Erro ${resposta.status}`;
    throw new Error(mensagem);
  }
  return resposta;
}

export async function listarTarefas(): Promise<Tarefa[]> {
  const resposta = await verificar(await fetch(API_URL));
  return resposta.json();
}

export async function buscarTarefa(id: number): Promise<Tarefa> {
  const resposta = await verificar(await fetch(`${API_URL}/${id}`));
  return resposta.json();
}
