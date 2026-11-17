package com.fatec.itu.taskflow.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fatec.itu.taskflow.dto.TarefaRequestDTO;
import com.fatec.itu.taskflow.dto.TarefaResponseDTO;
import com.fatec.itu.taskflow.dto.TarefaStatusDTO;
import com.fatec.itu.taskflow.entity.Tarefa;
import com.fatec.itu.taskflow.mapper.TarefaMapper;
import com.fatec.itu.taskflow.service.TarefaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    private final TarefaService service;

    TarefaController(TarefaService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<TarefaResponseDTO>> getAll() {
        List<TarefaResponseDTO> tarefas = service.getAll()
                                                 .stream()
                                                 .map(TarefaMapper::toDTO)
                                                 .toList();
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("{id}")
    public ResponseEntity<TarefaResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(TarefaMapper.toDTO(service.getById(id)));
    }

    @PostMapping
    public ResponseEntity<TarefaResponseDTO> create(@Valid @RequestBody TarefaRequestDTO request) {
        Tarefa t = service.create(TarefaMapper.toEntity(request));
        TarefaResponseDTO response = TarefaMapper.toDTO(t);

        URI location = ServletUriComponentsBuilder
                       .fromCurrentRequest()
                       .path("/{id}")
                       .buildAndExpand(response.id())
                       .toUri();

        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> update(@PathVariable Long id,
                                       @Valid @RequestBody TarefaRequestDTO request) {
        service.update(id, TarefaMapper.toEntity(request));
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id,
                                             @Valid @RequestBody TarefaStatusDTO request) {
        service.updateStatus(id, request.status());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
