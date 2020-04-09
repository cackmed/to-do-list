import TodoApp from './todoApp.js';

const app = new TodoApp();
document.body.prepend(app.renderDOM());
