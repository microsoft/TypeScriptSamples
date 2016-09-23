import { Injectable } from '@angular/core';

export class Todo {
  completed: boolean;
  editing: boolean;

  private _title: string;
  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value.trim();
  }

  constructor(title: string) {
    this.completed = false;
    this.editing = false;
    this.title = title.trim();
  }
}

@Injectable()
export class TodoStore {
  todos: Array<Todo>;

  constructor() {
    let persistedTodos = JSON.parse(localStorage.getItem('angular2-todos') || '[]');
    // Normalize back into classes
    this.todos = persistedTodos.map( (todo: {_title: string, completed: boolean}) => {
      let ret = new Todo(todo._title);
      ret.completed = todo.completed;
      return ret;
    });
  }

  private updateStore() {
    localStorage.setItem('angular2-todos', JSON.stringify(this.todos));
  }

  private getWithCompleted(completed: boolean) {
    return this.todos.filter((todo: Todo) => todo.completed === completed);
  }

  allCompleted() {
    return this.todos.length === this.getCompleted().length;
  }

  setAllTo(completed: boolean) {
    this.todos.forEach((t: Todo) => t.completed = completed);
    this.updateStore();
  }

  removeCompleted() {
    this.todos = this.getWithCompleted(false);
    this.updateStore();
  }

  getRemaining() {
    return this.getWithCompleted(false);
  }

  getCompleted() {
    return this.getWithCompleted(true);
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.updateStore();
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStore();
  }

  add(title: string) {
    this.todos.push(new Todo(title));
    this.updateStore();
  }
}
