import Component from '../component.js';

import BoardBuilderForm from '../partials/board-builder-form.js';

import Users from '../../models/users.js';

class NewBoardConstructor extends Component {
	constructor() {
		super();
		
		this.model = new Users();
	}

	getData() {
		return new Promise(resolve => resolve());
	}
	
	render() {
		return new Promise(resolve => {
			this.boardBuilderForm = new BoardBuilderForm('Creating a board...');

			resolve(`${this.boardBuilderForm.render()}`);
		});
	}

	afterRender() {
		this.boardBuilderForm.afterRender();
	}
}

export default NewBoardConstructor;