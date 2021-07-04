import Component from '../component.js';

import SignupLoginForm from '../partials/signup-login-form.js';

class LoginPage extends Component {
	getData() {
		return new Promise(resolve => resolve());
	}

	render() {
		return new Promise(resolve => {
			this.initializationForm = new SignupLoginForm('Log In');

			resolve(`
				<div class="content__manager">
					${this.initializationForm.render()}
				</div>
			`);
		});
	}

	afterRender() {
		this.initializationForm.afterRender();
	}
}

export default LoginPage;