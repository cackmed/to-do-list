import TodoItem from '../todo/todoItem.js';
const test = QUnit.test// eslint-disable-line

QUnit.module('Render Todo Item');// eslint-disable-line

test('renders html from data', assert => {
    const todo = {
        id: 3,
        task: 'Tested Design',
        complete: true
    };

    const expected = /*html*/`
        <li class = "to-do-task" id="to-do-task"> <p class=>Tested Design</p> <span class="false">Is it complete? "true</span> <div> <button class="inactive-button"> Toggle Not Complete </button> <button class="remove-button"> Remove Task </button> </div> </li>
    `;

    // act
    const todoItem = new TodoItem({ todo: todo });
    const html = todoItem.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});
