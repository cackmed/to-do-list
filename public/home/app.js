import Component from '../Component.js';
import Header from '../common/header.js';
import SignUp from './signup.js';
import SignIn from './signin.js';
import { userSignUp, userSignIn } from '../services/todo-api.js';


function success(user) {
    localStorage.setItem('TOKEN', user.token);
    localStorage.setItem('User', user.displayName);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './todo.html';
}

class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const user = localStorage.getItem('USER');
        if (user) {
            const logout = dom.querySelector('.logout');
            logout.addEventListener('click', () => {
                localStorage.removeItem('TOKEN');
                localStorage.removeItem('USER');
                this.update();
            });
            return;
        }
        const errors = dom.querySelector('.errors');
        const signUpContainer = dom.querySelector('#signup-container');
        const signInContainer = dom.querySelector('#signin-container');

        const signUp = new SignUp({
            onSignUp: async newUser => {
                errors.textContent = '';
                try {
                    const user = await userSignUp(newUser);
                    success(user);
                }
                catch (err) {
                    errors.textContent = err;
                    throw err;
                }
            }
        });
        signUpContainer.appendChild(signUp.renderDOM());

        const signIn = new SignIn({
            onSignIn: async credentials => {
                errors.textContent = '';
                try {
                    const user = await userSignIn(credentials);
                    success(user);
                }
                catch (err) {
                    errors.textContent = err;
                    throw err;
                }
            }
        });
        signInContainer.appendChild(signIn.renderDOM());

        const switchToSignInForm = dom.querySelector('#signin-button');
        switchToSignInForm.addEventListener('click', () => {
            signInContainer.classList.remove('no-display');
            signUpContainer.classList.add('no-display');
        });
        const switchToSignUpForm = dom.querySelector('#signup-button');
        switchToSignUpForm.addEventListener('click', () => {
            signUpContainer.classList.remove('no-display');
            signInContainer.classlist.add('no-display');
        });
    }
    

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <p>This will be the user login on day 2 or will it?</p>
                </main>
            </div>
        `;
    }
}

export default App;
