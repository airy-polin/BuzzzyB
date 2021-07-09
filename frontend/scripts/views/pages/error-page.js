import Component from '../component';

import Button from '../partials/controls/button';

import { storage } from '../../data/storage';

class ErrorPage extends Component {
	constructor() {
		super();
		this.error = storage.error;
	}

	getData() {
		return new Promise(resolve => resolve());
	}

	render() {
		this.getBackButton = new Button('Main page', Button.Type.PRIMARY, Button.Size.BIG, () => this.getBackToMainPage());

		return new Promise(resolve => {
			resolve(`
				<div class="error">Unexpected Error</div>

				<div class="manager__buttons">
					${this.getBackButton.render()}
				</div>
			`);
		});
	}

	afterRender() {
		this.getBackButton.afterRender();
	}

	getBackToMainPage() {
		location.hash = '#/';
	}
}

export default ErrorPage;