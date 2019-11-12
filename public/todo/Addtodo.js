import Component from '../Component.js';

class AddTodo extends Component {

    onRender(form) {
        const onAdd = this.props.onAdd;
        const input = form.querySelector('input[name="task]');
        
        form.addEventListener('submit', async event => {
            event.preventDefault();
            const addedTask = {
                task: input.value
            };
            try {
                await onAdd(addedTask);
                // this only runs if no error:
                form.reset();
                document.activeElement.blur();
            }
            catch (err) {
                // nothing to do as App will show error,
                // but will keep form from clearing...
            }
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="task-form">
                <input name="task" required>
                <button>Add</button>
            </form>
        `;
    }
}

export default AddTodo;
