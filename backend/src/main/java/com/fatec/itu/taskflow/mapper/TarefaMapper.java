package com.fatec.itu.taskflow.mapper;

import com.fatec.itu.taskflow.dto.TarefaRequestDTO;
import com.fatec.itu.taskflow.dto.TarefaResponseDTO;
import com.fatec.itu.taskflow.entity.Tarefa;

public class TarefaMapper {

    public static Tarefa toEntity(TarefaRequestDTO request) {
        Tarefa t = new Tarefa();
        t.setTitulo(request.titulo());
        t.setDescricao(request.descricao());
        t.setResponsavel(request.responsavel());
        t.setStatus(request.status() != null ? request.status() : "PENDENTE");
        t.setPrioridade(request.prioridade() != null ? request.prioridade() : "MEDIA");

        return t;
    }

    public static TarefaResponseDTO toDTO(Tarefa tarefa) {
        return new TarefaResponseDTO(
            tarefa.getId(),
            tarefa.getTitulo(),
            tarefa.getDescricao(),
            tarefa.getResponsavel(),
            tarefa.getStatus(),
            tarefa.getPrioridade()
        );
    }
}
