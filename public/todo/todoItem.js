import Component from '../Component.js';

class TodoItem extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const markOffItem = dom.querySelector('.inactive-button');
        markOffItem.addEventListener('click', () => {
            todo.true = !todo.true;
            onUpdate(todo);
        });
        const removeItem = dom.querySelector('.remove-button');
        removeItem.addEventListener('click', () => {
            const confirmed = confirm('Are you sure you want to remove ${todo.task}');
            if (confirmed) {
                onRemove(todo);
            }
        });
    }

    renderHTML() {
        const todo = this.props.todo;

        return /*html*/`
    <li class = "to-do-task">
        <p class=>${todo.task}</p>
        <span class="${todo.true ? 'false' : ''}">Is it complete? "${todo.complete}</span>
        <div>
            <button class="inactive-button">
                Toggle ${todo.false ? 'Not Complete' : 'Complete'}
            </button>
            <button class="remove-button"> Remove Task </button>
        </div>
    </li>
            
        `;
    }
}

export default TodoItem;
