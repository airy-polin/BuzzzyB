import Button from './controls/button';

import Users from '../../models/users';

class InitializationButtons {
	constructor() {
		this.model = new Users();
	}

	render() {
		this.signUpButton = new Button('Sign Up', Button.Type.SECONDARY, Button.Size.BIG, null, '#/signup');
		this.logInButton = new Button('Log In', Button.Type.PRIMARY, Button.Size.BIG, null, '#/login');

		return `
			<div class="manager__buttons">
				${this.signUpButton.render()}
				${this.logInButton.render()}
			</div>
		`;
	}

	afterRender() {
		this.signUpButton.afterRender();
		this.logInButton.afterRender();
	}
}

export default InitializationButtons;