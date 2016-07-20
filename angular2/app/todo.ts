import {Component, bootstrap, NgFor, provide} from 'angular2/angular2';
import {AngularFire, FirebaseArray} from '../firebase/angularfire';

@Component({
  selector: 'todo-app',
  providers: [
    AngularFire,
    provide(Firebase, { useValue: new Firebase('https://webapi.firebaseio-demo.com/test') })
  ],
  directives: [NgFor],
  templateUrl: 'todo.html'
})
class TodoApp {
  todoService: FirebaseArray;
  todoEdit: any;

  constructor(sync: AngularFire) {
    this.todoService = sync.asArray();
    this.todoEdit = null;
  }
  enterTodo($event, newTodo) {
    if($event.which === 13) { // ENTER_KEY
      this.addTodo(newTodo.value);
      newTodo.value = '';
    }
  }
  editTodo($event, todo) {
    this.todoEdit = todo;
  }
  doneEditing($event, todo) {
    var which = $event.which;
    var target = $event.target;
    if(which === 13) {
      todo.title = target.value;
      this.todoService.save(todo);
      this.todoEdit = null;
    } else if (which === 27) {
      this.todoEdit = null;
      target.value = todo.title;
    }
  }
  addTodo(newTitle) {
    this.todoService.add({
      title: newTitle,
      completed: false
    });
  }
  completeMe(todo) {
    todo.completed = !todo.completed;
    this.todoService.save(todo);
  }
  deleteMe(todo) {
    this.todoService.remove(todo);
  }
  toggleAll($event) {
    var isComplete = $event.target.checked;
    this.todoService.list.forEach((todo)=> {
      todo.completed = isComplete;
      this.todoService.save(todo);
    });
  }
  clearCompleted() {
    var toClear = {};
    this.todoService.list.forEach((todo) => {
      if(todo.completed) {
        toClear[todo._key] = null;
      }
    });
    this.todoService.bulkUpdate(toClear);
  }

}
bootstrap(TodoApp);
