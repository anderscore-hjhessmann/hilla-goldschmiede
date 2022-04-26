import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/date-picker';
import '@vaadin/checkbox';
import '@vaadin/grid';
import '@vaadin/icon';
import '@vaadin/icons';
import {html, render} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from '../../views/view';
import {Binder, field} from "@hilla/form";
import TodoItemModel from "Frontend/generated/com/example/application/repository/todo/TodoItemModel";
import {todoItemStore} from "Frontend/stores/todo-store";
import TodoItem from "Frontend/generated/com/example/application/repository/todo/TodoItem";
import {GridColumn, GridItemModel} from "@vaadin/grid";

@customElement('todo-grid-view')
export class TodoGridView extends View {
    private binder = new Binder(this, TodoItemModel);

    constructor() {
        super();
        this.autorun(() => {
            if (todoItemStore.selectedItem) {
                this.binder.read(todoItemStore.selectedItem);
            } else {
                this.binder.clear();
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex', 'flex-col', 'p-m', 'gap-m', 'items-start');
    }

    render() {
        return html`
            <h1>Todo-Liste</h1>
            <vaadin-grid .items="${todoItemStore.todoItems}"
                         .selectedItems="${[todoItemStore.selectedItem]}"
                         @active-item-changed="${this.handleGridSelection}"
                         theme="column-borders">
                <vaadin-grid-column path="id" width="2em"></vaadin-grid-column>
                <vaadin-grid-column path="name" header="Aufgabe" auto-width resizable></vaadin-grid-column>
                <vaadin-grid-column path="due" auto-width resizable></vaadin-grid-column>
                <vaadin-grid-column path="done" width="2em"
                                    .renderer="${this.renderDone.bind(this)}"></vaadin-grid-column>
                <vaadin-grid-column width="2em" .renderer="${this.renderDelete}"></vaadin-grid-column>
            </vaadin-grid>
            <div>
                <vaadin-text-field label="Aufgabe" ${field(this.binder.model.name)}></vaadin-text-field>
                <vaadin-date-picker label="bis" ${field(this.binder.model.due)}></vaadin-date-picker>
                <vaadin-checkbox label="erledigt" ${field(this.binder.model.done)}></vaadin-checkbox>
                <vaadin-button @click="${this.saveItem}">${this.binder.value.id ? "Speichern" : "Hinzufügen"}
                </vaadin-button>
            </div>
        `;
    }

    renderDone(root: HTMLElement, column: GridColumn<TodoItem>, model: GridItemModel<TodoItem>) {
        const todo = model.item;
        render(html`
            <vaadin-checkbox
                    .checked="${todo.done}"
                    @checked-changed="${(ev: CustomEvent) =>
                            this.updateDoneState(todo, ev.detail.value)}"
            ></vaadin-checkbox>
        `, root);
    }

    renderDelete = (root: HTMLElement, column: GridColumn<TodoItem>, model: GridItemModel<TodoItem>) => {
        render(html`
            <vaadin-button theme="icon"
                           aria-label="Delete item"
                           @click="${() => todoItemStore.deleteItem(model.item)}">
                <vaadin-icon icon="vaadin:trash"></vaadin-icon>
            </vaadin-button>
        `, root);
    }

    handleGridSelection(ev: CustomEvent) {
        console.log("selected: " + JSON.stringify(ev.detail.value));
        todoItemStore.selectedItem = ev.detail.value as TodoItem;
    }

    async saveItem() {
        await this.binder.submitTo(todoItemStore.saveItem);
        this.binder.clear();
    }

    private updateDoneState(todo: TodoItem, value: boolean) {
        if (todo.done !== value) {
            todo.done = value;
            todoItemStore.saveItem(todo);
        }
    }
}
