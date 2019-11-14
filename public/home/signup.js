import Component from '../Component.js';

class UserSignUp extends Component {

    onRender(form) {
        const onUserSignUp = this.props.UserSignUp;

        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };
            
            onUserSignUp(user);
        });
    }
    renderHTML() {
        return /*html*/` 
            <form class="auth-form standard">
                <p>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Your Name">
                </p>
                <p>
                    <label for="email">Email</label>
                    <input id="email" type="email" name="email" required placeholder="place@email.com">
                </p>
                <p>
                    <label for="password">Password</label>
                    <input id="password" type="password" name="password" required>
                </p>
                <p>
                    <button>Sign Up</button>
                </p>
            </form>
        `;
    }


}
export default UserSignUp;