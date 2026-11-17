package com.fatec.itu.taskflow;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class TarefaControllerTests {

    @Autowired
    private MockMvc mvc;

    private static final String TAREFA_VALIDA = """
        {"titulo": "Nova tarefa", "descricao": "Teste", "responsavel": "Arthur",
         "status": "PENDENTE", "prioridade": "ALTA"}
        """;

    @Test
    void listaAsTarefasDoSeeding() throws Exception {
        mvc.perform(get("/api/tarefas"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$", hasSize(4)));
    }

    @Test
    void consultaPorIdEDevolve404QuandoNaoExiste() throws Exception {
        mvc.perform(get("/api/tarefas/1"))
           .andExpect(status().isOk())
           .andExpect(jsonPath("$.titulo").value("Configurar o banco H2"));

        mvc.perform(get("/api/tarefas/999"))
           .andExpect(status().isNotFound());
    }

    @Test
    void cadastraTarefaValida() throws Exception {
        mvc.perform(post("/api/tarefas").contentType(MediaType.APPLICATION_JSON).content(TAREFA_VALIDA))
           .andExpect(status().isCreated())
           .andExpect(header().exists("Location"))
           .andExpect(jsonPath("$.id").value(5));
    }

    @Test
    void recusaTarefaSemCamposObrigatorios() throws Exception {
        mvc.perform(post("/api/tarefas").contentType(MediaType.APPLICATION_JSON)
                                        .content("{\"status\": \"FEITA\", \"prioridade\": \"ALTA\"}"))
           .andExpect(status().isBadRequest())
           .andExpect(jsonPath("$.erros", hasSize(3)));
    }

    @Test
    void editaTarefa() throws Exception {
        mvc.perform(put("/api/tarefas/2").contentType(MediaType.APPLICATION_JSON).content(TAREFA_VALIDA))
           .andExpect(status().isNoContent());

        mvc.perform(get("/api/tarefas/2"))
           .andExpect(jsonPath("$.titulo").value("Nova tarefa"));
    }

    @Test
    void alteraSomenteOStatus() throws Exception {
        mvc.perform(patch("/api/tarefas/3/status").contentType(MediaType.APPLICATION_JSON)
                                                  .content("{\"status\": \"CONCLUIDA\"}"))
           .andExpect(status().isNoContent());

        mvc.perform(get("/api/tarefas/3"))
           .andExpect(jsonPath("$.status").value("CONCLUIDA"))
           .andExpect(jsonPath("$.titulo").value("Montar o app mobile"));

        mvc.perform(patch("/api/tarefas/3/status").contentType(MediaType.APPLICATION_JSON)
                                                  .content("{\"status\": \"QUALQUER\"}"))
           .andExpect(status().isBadRequest());
    }

    @Test
    void excluiTarefa() throws Exception {
        mvc.perform(delete("/api/tarefas/4"))
           .andExpect(status().isNoContent());

        mvc.perform(delete("/api/tarefas/4"))
           .andExpect(status().isNotFound());
    }
}
