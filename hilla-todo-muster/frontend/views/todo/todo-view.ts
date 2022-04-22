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
            <div>
                ${this.items.map(item => html`
                    <div class="todo-item">
                        <vaadin-checkbox
                                .checked="${item.done}"
                                @checked-changed="${(ev: CustomEvent) =>
                                        this.updateDoneState(item, ev.detail.value)}"
                        ></vaadin-checkbox>
                        <span class="todo-item">${item.name}</span>
                    </div>
                `)}
            </div>
            <div>
                <vaadin-text-field 
                        label="Aufgabe" 
                        ${field(this.binder.model.name)}>
                </vaadin-text-field>
                <vaadin-button
                        theme="primary"
                        @click="${this.addItem}"
                        ?disabled="${this.binder.invalid}"
                >Hinzufügen</vaadin-button>
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

    async updateDoneState(todo: TodoItem, done: boolean) {
        console.log("update: " + todo?.id + ". " + todo?.name + " to:" + done);
        if (todo.done !== done) {
            const updatedItem = await TodoEndpoint.saveItem({...todo, done});
            if (updatedItem) {
                this.items = this.items.map(item => item.id === todo.id ? updatedItem : item);
            }
        }
    }
}
