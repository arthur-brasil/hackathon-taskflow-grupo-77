package com.fatec.itu.taskflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.fatec.itu.taskflow.entity.Tarefa;
import com.fatec.itu.taskflow.repository.TarefaRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TarefaService {

    private final TarefaRepository repository;

    TarefaService(TarefaRepository repository) {
        this.repository = repository;
    }

    public List<Tarefa> getAll() {
        return repository.findAll();
    }

    public Tarefa getById(Long id) {
        return repository.findById(id)
                         .orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada"));
    }

    public Tarefa create(Tarefa tarefa) {
        return repository.save(tarefa);
    }

    public void update(Long id, Tarefa tarefa) {
        Tarefa t = getById(id);

        t.setTitulo(tarefa.getTitulo());
        t.setDescricao(tarefa.getDescricao());
        t.setResponsavel(tarefa.getResponsavel());
        t.setStatus(tarefa.getStatus());
        t.setPrioridade(tarefa.getPrioridade());

        repository.save(t);
    }

    public void updateStatus(Long id, String status) {
        Tarefa t = getById(id);
        t.setStatus(status);
        repository.save(t);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("Tarefa não encontrada");
        }
        repository.deleteById(id);
    }
}
