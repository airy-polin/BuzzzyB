import Button from './controls/button';

import Users from '../../models/users';

class MainMenuButtons {
	constructor() {
		this.model = new Users();
	}

	render() {
		this.addButton = new Button('New board', Button.Type.PRIMARY, Button.Size.BIG, null, '#/boards/add');

		return `
			<div class="manager__buttons">
				${this.addButton.render()}
			</div>
		`;
	}

	afterRender() {
		this.addButton.afterRender();
	}
}

export default MainMenuButtons;