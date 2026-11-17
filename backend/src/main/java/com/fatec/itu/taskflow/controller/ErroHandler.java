package com.fatec.itu.taskflow.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class ErroHandler {

    // 404 quando o id não existe
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, Object>> naoEncontrado(EntityNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(Map.of("status", 404, "mensagem", e.getMessage()));
    }

    // 400 com a lista de mensagens da validação
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> invalido(MethodArgumentNotValidException e) {
        List<String> erros = e.getBindingResult()
                              .getFieldErrors()
                              .stream()
                              .map(erro -> erro.getDefaultMessage())
                              .toList();
        return ResponseEntity.badRequest()
                             .body(Map.of("status", 400, "erros", erros));
    }
}
