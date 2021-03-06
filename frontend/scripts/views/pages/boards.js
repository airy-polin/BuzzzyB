import Component from '../component';

import MainMenuButtons from '../partials/main-menu-buttons';
import Board from '../partials/board';

import { storage } from '../../data/storage';

import Users from '../../models/users';

class Boards extends Component {
	constructor() {
		super();

		this.model = new Users();
	}

	getData() {
		return new Promise(resolve => {
			this.model.getBoards().then(boards => {
				storage.boards = boards;
				resolve();
			});
		});
	}

	render() {
		return new Promise(resolve => {
			this.mainMenuButtons = new MainMenuButtons();
			this.boards = storage.boards.map(board => new Board(board));

			resolve(`
				${this.mainMenuButtons.render()}
				<div class="boards">
					${this.boards.map(board => board.render()).join('')}
				</div>
			`);
		});
	}

	afterRender() {
		this.mainMenuButtons.afterRender();
		this.boards.map(board => board.afterRender());
	}
}

export default Boards;