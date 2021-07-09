import Component from '../component';

import SignupLoginForm from '../partials/signup-login-form';

class SignUpPage extends Component {
	getData() {
		return new Promise(resolve => resolve());
	}

	render() {
		return new Promise(resolve => {
			this.initializationForm = new SignupLoginForm('Sign Up');

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

export default SignUpPage;