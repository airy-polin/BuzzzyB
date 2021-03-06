import RadioButton from './controls/radio-button';
import Input from './controls/input';
import Button from './controls/button';
import CloseButton from './controls/close-button';

import Users from '../../models/users';

import { storage } from '../../data/storage';

class SignupLoginForm {
	constructor(formName) {
		this.formName = formName;
		this.model = new Users();
	}

	render() {
		this.radioButton = this._getRadioButtonFlag();

		this.emailAddressInput = new Input('Email Address', Input.Type.TEXT);
		this.passwordInput = new Input('Password', Input.Type.PASSWORD);

		this.signUpButton = new Button('Sign Up', Button.Type.PRIMARY, Button.Size.SMALL, (event) => this.onFormSubmit(event));
		this.logInButton = new Button('Log In', Button.Type.PRIMARY, Button.Size.SMALL, (event) => this.onFormSubmit(event));
		this.cancelButton = new Button('Cancel', Button.Type.SECONDARY, Button.Size.SMALL, () => this.closeInitializationForm());

		this.closeButton = new CloseButton(() => this.closeInitializationForm());

		return `
			<form class="form">
				<div class="form__header">
					<span class="form__title">${this.formName} Form</span>

					${this.closeButton.render()}
				</div>

				<div class="form__controls">
					${this.radioButton.render()}

					${this.emailAddressInput.render()}
					${this.passwordInput.render()}

					<div class="form__buttons">
						${this.cancelButton.render()}
						${this._getContextButton(this.logInButton, this.signUpButton).render()}
					</div>
				</div>
			</form>
		`;
	}

	afterRender() {
		this.radioButton.afterRender();
		this.closeButton.afterRender();
		this.cancelButton.afterRender();

		this._getContextButton(this.logInButton, this.signUpButton).afterRender();
	}

	closeInitializationForm() {
		location.hash = '#/';
	}

	onFormSubmit(event) {
		event.preventDefault();

		if (location.hash === '#/signup') {
			let error = this.validateOnRegistrationForm();

			if (error === 0) {
				this.registerUser();
			}
		}

		if (location.hash === '#/login') {
			this.loginUser();
		}
	}

	validateOnRegistrationForm() {
		let error = 0;

		const form = document.getElementsByTagName('form')[0],
			inputs = form.querySelectorAll('div.form__input > input');

		for (let i = 0; i < inputs.length; i++) {
			const input = inputs[i];

			let validate;
			if (input.getAttribute('type') === 'text') {
				validate = this.validateEmail;
			} else if (input.getAttribute('type') === 'password') {
				validate = this.validatePassword;
			}

			if (validate(input)) {
				this.formAddError(input);
				error++;
				input.value = '';
				input.nextElementSibling.classList.remove('hidden');
			}
		}

		return error;
	}

	formAddError(input) {
		input.classList.add('invalid');
		input.parentElement.classList.add('invalid');
	}

	formRemoveError(input) {
		input.classList.remove('invalid');
		input.parentElement.classList.remove('invalid');
	}

	validateEmail(input) {
		return !/^[a-z\d_]{3,20}@[a-z\d]{2,5}\.[a-z\d]{2,3}$/i.test(input.value);
	}

	validatePassword(input) {
		return !/^[a-z\d]{6,10}$/i.test(input.value);
	}

	registerUser() {
		const newUser = {
			email: document.getElementById('email-address').value,
			password: document.getElementById('password').value
		};

		return new Promise(() => this.model.registerUser(newUser)
			.then(user => {
				document.cookie = `userToken=${user.id}`;
				storage.user = user;
				location.hash = '#/boards';
			})
			.catch(() => location.hash = '#/error')
		);
	}

	loginUser() {
		const user = {
			email: document.getElementById('email-address').value,
			password: document.getElementById('password').value
		};

		return new Promise(() => this.model.loginUser(user)
			.then(user => {
				document.cookie = `userToken=${user.id}`;
				storage.user = user;
				location.hash = '#/boards';
			})
			.catch(() => location.hash = '#/error')
		);
	}

	_getRadioButtonFlag() {
		switch (this.formName) {
			case 'Sign Up': return new RadioButton('Sign Up', 'Log In', true);
			case 'Log In': return new RadioButton('Sign Up', 'Log In', false);
		}
	}

	_getContextButton(logInButton, signUpButton) {
		switch (this.formName) {
			case 'Log In': return logInButton;
			case 'Sign Up': return signUpButton;
		}
	}
}

export default SignupLoginForm;