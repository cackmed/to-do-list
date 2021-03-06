import Component from '../Component.js';
import Header from '../common/header.js';
import Loading from '../common/loading.js';
import AddTodo from './Addtodo.js';
import TodoList from './todoList.js';
import { getTodos, addTodo, updateTodo, removeTodo } from '../services/todo-api.js';
class TodoApp extends Component {

    async onRender(dom) {
        const header = new Header({ title: 'My Todos' });
        dom.prepend(header.renderDOM());
        
        const main = dom.querySelector('main');
        const error = dom.querySelector('.error');

        const loading = new Loading({ loading: true });
        dom.appendChild(loading.renderDOM());

        const toDoForm = new AddTodo({
            onAdd: async todo => {
                loading.update({ loading: true });
                error.textContent = '';
    
                try {
                    
                    const saved = await addTodo(todo);
                    const todos = this.state.todos;
                    todos.push(saved);
                    toDoList.update({ todos });
                }
                catch (err) {
                    error.textContent = err;
                    throw err;
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(toDoForm.renderDOM());

        const toDoList = new TodoList({
            todos: [],
            onUpdate: async todo => {
                loading.update({ loading: true });
                error.textContent = '';

                try {
                    const updated = await updateTodo(todo);
                    const todos = this.state.todos;
                    const index = todos.indexOf(todo);
                    todos.slice(index, 1, updated);

                    toDoList.update({ todos });
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            },
            onRemove: async todo => {
                loading.update({ loading: true });
                error.textContent = '';
                console.log('helloooooo!');
                try {
                    await removeTodo(todo.id);
                    const todos = this.state.todos;
                    const index = todos.indexOf(todo);
                    todos.splice(index, 1);
                    toDoList.update({ todos });
                }
                catch (err) {
                    console.log(err);
                }
                finally {
                    loading.update({ loading: false });
                }
            }
        });
        main.appendChild(toDoList.renderDOM());
        try {
            const todos = await getTodos({ showAll: true });
            this.state.todos = todos;

            toDoList.update({ todos });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            loading.update({ loading: false });
        }
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <!-- show errors: -->
                <p class="error"></p>
                <main>
                    <!-- add todo goes here -->
                    <!-- todo list goes here -->
                </main>
            </div>
        `;
    }
}

export default TodoApp;
