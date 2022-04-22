package com.example.application.repository.todo;

import org.springframework.data.jpa.repository.JpaRepository;

// tag::code[]
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
}
