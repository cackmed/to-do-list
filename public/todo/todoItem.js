import Component from '../Component.js';

class TodoItem extends Component {

    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const markOffItem = dom.querySelector('.inactive-button');
        markOffItem.addEventListener('click', () => {
            todo.inactive = !todo.inactive;
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
    <li class = "to-do-list">
        <span class="${todo.inactive ? 'inactive' : ''}">"${todo.taks}</span>
        <div>
            <button class="inactive-button">
                Make ${todo.inactive ? 'Active' : 'inactive'}
            </button>
            <button> Remove Task </button>
        </div>
    </li>
            
        `;
    }
}

export default TodoItem;
