package com.fatec.itu.taskflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.itu.taskflow.entity.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

}
