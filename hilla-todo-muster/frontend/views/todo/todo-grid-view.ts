import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/date-picker';
import '@vaadin/checkbox';
import '@vaadin/grid';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {View} from '../../views/view';
import {Binder, field} from "@hilla/form";
import TodoItemModel from "Frontend/generated/com/example/application/repository/todo/TodoItemModel";
import {todoItemStore} from "Frontend/stores/todo-store";

@customElement('todo-grid-view')
export class TodoGridView extends View {
    private binder = new Binder(this, TodoItemModel);

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex', 'flex-col', 'p-m', 'gap-m', 'items-start');
    }

    render() {
        return html`
            <h1>Todo-Liste</h1>
            <vaadin-grid .items="${todoItemStore.todoItems}">
                <vaadin-grid-column path="id"></vaadin-grid-column>
                <vaadin-grid-column path="name" header="Aufgabe"></vaadin-grid-column>
                <vaadin-grid-column path="due"></vaadin-grid-column>
                <vaadin-grid-column path="done"></vaadin-grid-column>
            </vaadin-grid>
            <div>
                <vaadin-text-field label="Aufgabe" ${field(this.binder.model.name)}></vaadin-text-field>
                <vaadin-date-picker label="bis" ${field(this.binder.model.due)}></vaadin-date-picker>
                <vaadin-checkbox label="erledigt" ${field(this.binder.model.done)}></vaadin-checkbox>
                <vaadin-button @click="${this.addItem}">Hinzufügen</vaadin-button>
            </div>
        `;
    }

    async addItem() {
        await this.binder.submitTo(todoItemStore.saveItem);
        this.binder.clear();
    }
}
