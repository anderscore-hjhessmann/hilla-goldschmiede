import '@vaadin/button';
import '@vaadin/text-field';
import '@vaadin/date-picker';
import '@vaadin/checkbox';
import '@vaadin/grid';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from '../../views/view';
import {Binder, field} from "@hilla/form";
import TodoItemModel from "Frontend/generated/com/example/application/repository/todo/TodoItemModel";
import {TodoEndpoint} from "Frontend/generated/endpoints";
import TodoItem from "Frontend/generated/com/example/application/repository/todo/TodoItem";

@customElement('todo-grid-view')
export class TodoGridView extends View {
    private binder = new Binder(this, TodoItemModel);
    @state()
    private items: TodoItem[] = [];

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('flex', 'flex-col', 'p-m', 'gap-m', 'items-start');
    }

    async firstUpdated() {
        this.items = await TodoEndpoint.findAll();
    }

    render() {
        return html`
            <h1>Todo-Liste</h1>
            <vaadin-grid .items="${this.items}">
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
        const savedItem = await this.binder.submitTo(TodoEndpoint.saveItem);
        if (savedItem) {
            console.log("created item with id " + savedItem.id);
            this.binder.clear();
            this.items = [...this.items, savedItem];
        }
    }
}
