package com.fatec.itu.taskflow.dto;

public record TarefaResponseDTO(
    Long id,
    String titulo,
    String descricao,
    String responsavel,
    String status,
    String prioridade
) {

}
