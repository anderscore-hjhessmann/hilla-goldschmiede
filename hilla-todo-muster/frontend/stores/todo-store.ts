import TodoItem from "Frontend/generated/com/example/application/repository/todo/TodoItem";
import {makeAutoObservable, observable, runInAction} from "mobx";
import {TodoEndpoint} from "Frontend/generated/endpoints";

class TodoItemStore {
    todoItems: TodoItem[] = [];

    constructor() {
        makeAutoObservable(
            this,
            {
                initFromServer: false,
                todoItems: observable.shallow
            },
            {
                autoBind: true
            }
        );

        this.initFromServer();
    }

    async initFromServer() {
        const items = await TodoEndpoint.findAll();

        runInAction(() => {
            this.todoItems = items;
        })
    }

    async saveItem(item: TodoItem) {
        const saved = await TodoEndpoint.saveItem(item);
        if (saved) {
            this.saveLocal(saved);
        }
    }

    private saveLocal(saved: TodoItem) {
        const itemExists = this.todoItems.some((item) => item.id === saved.id);
        if (itemExists) {
            this.todoItems = this.todoItems.map(item => item.id === saved.id ? saved : item);
        } else {
            this.todoItems.push(saved);
        }
    }
}

export const todoItemStore = new TodoItemStore();