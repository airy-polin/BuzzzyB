import Button from './controls/button.js';

import Users from '../../models/users.js';

class MainMenuButtons {
	constructor() {
		this.model = new Users();
	}

	render() {
		this.addButton = new Button('My meetings', Button.Type.SECONDARY, Button.Size.BIG, null, '#/boards/list');
		this.listButton = new Button('New board', Button.Type.PRIMARY, Button.Size.BIG, null, '#/boards/add');

		return `
			<div class="manager__buttons">
				${this.addButton.render()}
				${this.listButton.render()}
			</div>
		`;
	}

	afterRender() {
		this.addButton.afterRender();
		this.listButton.afterRender();
	}
}

export default MainMenuButtons;