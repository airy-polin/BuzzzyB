import Component from '../component';

import SignupLoginForm from '../partials/signup-login-form';

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