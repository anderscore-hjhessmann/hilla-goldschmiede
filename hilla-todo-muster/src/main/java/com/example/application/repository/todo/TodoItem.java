package com.example.application.repository.todo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDate;

// tag::code[]
@Entity
@Table(name = "TODO")
@Getter
@Setter
@ToString
public class TodoItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    @Size(min = 2, max = 64)
    private String name;

    @FutureOrPresent
    private LocalDate due;

    private boolean done;
}
// end::code[]
