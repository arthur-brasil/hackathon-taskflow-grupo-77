package com.fatec.itu.taskflow.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

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

    // 400 quando o corpo não é um JSON válido (ou não foi enviado)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> corpoInvalido(HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest()
                             .body(Map.of("status", 400, "erros", List.of("O corpo da requisição deve ser um JSON válido")));
    }

    // 400 quando o id da URL não é um número (ex.: /api/tarefas/abc)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, Object>> idInvalido(MethodArgumentTypeMismatchException e) {
        return ResponseEntity.badRequest()
                             .body(Map.of("status", 400, "erros", List.of("O id deve ser um número")));
    }
}
