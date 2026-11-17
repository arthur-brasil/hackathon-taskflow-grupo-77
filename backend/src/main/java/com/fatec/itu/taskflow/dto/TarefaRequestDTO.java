package com.fatec.itu.taskflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record TarefaRequestDTO(

    @NotBlank(message = "O título é obrigatório")
    @Size(max = 100, message = "O título deve ter no máximo 100 caracteres")
    String titulo,

    @Size(max = 500, message = "A descrição deve ter no máximo 500 caracteres")
    String descricao,

    @NotBlank(message = "O responsável é obrigatório")
    @Size(max = 100, message = "O responsável deve ter no máximo 100 caracteres")
    String responsavel,

    @NotBlank(message = "O status é obrigatório")
    @Pattern(regexp = "PENDENTE|EM_ANDAMENTO|CONCLUIDA", message = "O status deve ser PENDENTE, EM_ANDAMENTO ou CONCLUIDA")
    String status,

    @NotBlank(message = "A prioridade é obrigatória")
    @Pattern(regexp = "BAIXA|MEDIA|ALTA", message = "A prioridade deve ser BAIXA, MEDIA ou ALTA")
    String prioridade
) {

}
