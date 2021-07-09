import { storage } from '../../data/storage';

import Users from '../../models/users';

import Input from './controls/input';
import Button from './controls/button';
import CloseButton from './controls/close-button';

class BoardBuilderForm {
	constructor(formName) {
		this.formName = formName;
		this.model = new Users();
	}

	render() {
		this.boardNameInput = new Input('What shall we call the board?', Input.Type.TEXT);
		this.createButton = new Button('Create', Button.Type.PRIMARY, Button.Size.SMALL, () => this.addBoard());
		this.cancelButton = new Button('Cancel', Button.Type.SECONDARY, Button.Size.SMALL, () => this.closeBoardBuilderForm());
		this.closeButton = new CloseButton(() => this.closeBoardBuilderForm());

		return `
			<form class="form">
				<div class="form__header">
					<span class="form__title">${this.formName}</span>

					${this.closeButton.render()}
				</div>

				<div class="form__controls">
					${this.boardNameInput.render()}

					<div class="form__buttons">
						${this.cancelButton.render()}
						${this.createButton.render()}
					</div>
				</div>
			</form>
		`;
	}

	afterRender() {
		this.closeButton.afterRender();
		this.cancelButton.afterRender();
		this.createButton.afterRender();
	}

	closeBoardBuilderForm() {
		location.hash = '#/boards';
	}

	addBoard() {
		const newBoard = {
			name: document.getElementById('what-shall-we-call-the-board').value
		};

		return new Promise(() => this.model.addBoard(newBoard)
			.then((addedBoard) => {
				storage.boards.push(addedBoard);
				location.hash = '#/boards';
			})
			.catch(status => alert(`${status}`))
		);
	}

}

export default BoardBuilderForm;