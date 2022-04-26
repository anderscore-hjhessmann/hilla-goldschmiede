package com.example.application.endpoints.todo;

import com.example.application.repository.todo.TodoItem;
import com.example.application.repository.todo.TodoItemRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

// tag::code[]
@Endpoint
@AnonymousAllowed
@Slf4j
public class TodoEndpoint {

    @Autowired
    private TodoItemRepository repository;

    @Nonnull
    public List<@Nonnull TodoItem> findAll() {
        return repository.findAll();
    }
    public TodoItem saveItem(TodoItem item) {
        log.info("saveItem: {}", item);
        return repository.save(item);
    }

    public void deleteItem(TodoItem item) {
        log.info("deleteItem: {}", item);
        repository.delete(item);
    }
}
