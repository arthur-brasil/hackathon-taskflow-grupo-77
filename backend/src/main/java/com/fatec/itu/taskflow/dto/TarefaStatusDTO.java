package com.fatec.itu.taskflow.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record TarefaStatusDTO(

    @NotBlank(message = "O status é obrigatório")
    @Pattern(regexp = "PENDENTE|EM_ANDAMENTO|CONCLUIDA", message = "O status deve ser PENDENTE, EM_ANDAMENTO ou CONCLUIDA")
    String status
) {

}
