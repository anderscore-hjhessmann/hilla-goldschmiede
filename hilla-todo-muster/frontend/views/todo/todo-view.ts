import '@vaadin/button';
import '@vaadin/text-field';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {View} from '../../views/view';
import {Binder, field} from "@hilla/form";
import TodoItemModel from "Frontend/generated/com/example/application/repository/todo/TodoItemModel";
import {TodoEndpoint} from "Frontend/generated/endpoints";
import TodoItem from "Frontend/generated/com/example/application/repository/todo/TodoItem";

@customElement('todo-view')
export class TodoView extends View {
    private binder = new Binder(this, TodoItemModel);
    @state()
    private items: TodoItem[] = [];

    async connectedCallback() {
        super.connectedCallback();
        this.items = await TodoEndpoint.findAll();
        this.classList.add('flex', 'flex-col', 'p-m', 'gap-m', 'items-start');
    }

    render() {
        return html`
            <h1>Todo-Liste</h1>
            <div>
                ${this.items.map(item => html`
                    <div class="todo-item">${item.name}</div>
                `)}
            </div>
            <div>
                <vaadin-text-field label="Aufgabe" ${field(this.binder.model.name)}></vaadin-text-field>
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
