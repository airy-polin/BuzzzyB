import Component from '../component.js';

import Task from './task.js';

import Users from '../../models/users.js';

class Board extends Component {
	constructor(board) {
		super();

		this.board = board;
		this.model = new Users();
	}

	render() {
		return `
			<div class="board" id="${this.board.id}">
				<div class="board__header">
					<span class="title">${this.board.name}</span>
				</div>

				<div class="board__input">
					<input class="input invisible" type="text" value="" tabindex="2" />
				</div>

				<div class="board__items"></div>
			</div>
		`;
	}

	afterRender() {
		const board = document.getElementById(this.board.id),
			boardTitle = board.getElementsByClassName('board__header')[0],
			boardInput = board.getElementsByClassName('board__input')[0],
			boardTasksContainer = board.getElementsByClassName('board__items')[0];

		board.addEventListener('dragover', this.dragOver);
		board.addEventListener('dragenter', this.dragEnter);
		board.addEventListener('dragleave', this.dragLeave);
		board.addEventListener('drop', this.dragDrop);

		boardTitle.addEventListener('click', (event) => this.updateBoardTitle(event));
		boardInput.addEventListener('click', (event) => this.focusBoard(event));

		// this.addBoard();
	}

	focusBoard(event) {
		const inputContainer = event.currentTarget,
			input = inputContainer.getElementsByTagName('input')[0];

		input.classList.remove('invisible');
		input.focus();

		input.addEventListener('blur', (event) => this.onfocusBoardOnInputBlur(event));
		input.addEventListener('keypress', (event) => this.onfocusBoardOnKeypress(event));
	}

	onfocusBoardOnInputBlur(event) {
		const input = event.currentTarget,
			value = input.value,
			inputContainer = input.parentElement,
			board = inputContainer.parentElement;
	
		if (value !== '') {
			const containerToAddRecord = board.getElementsByClassName('board__items')[0];
			const newTask = new Task(value);

			newTask.render().then(html => {
				containerToAddRecord.insertAdjacentHTML('beforeend', html);
				newTask.afterRender();
			});

			this.tabCount++;
			input.value = '';
		}
		input.classList.add('invisible');
	}

	onfocusBoardOnKeypress(event) {
		if (event.code === 'Enter') {
			event.target.blur();
		}
	}
	
	addRecordToBoard(container, text) {
		container.insertAdjacentHTML('beforeend', `<div class="board__item" tabindex=${tabCount}><span class="item__text">${text}</span><img src="images/check-mark-green.svg" alt="check mark / true" />`);
		tabCount++;
	}

	updateBoardTitle(event) {
		const titleContainer = event.currentTarget,
			title = titleContainer.getElementsByTagName('span')[0],
			titleValue = title.innerText,
			parentBoard = titleContainer.parentElement;

		titleContainer.innerHTML = `<input class="title" type="text" value=${titleValue} tabindex="1" />`;
		titleContainer.style.padding = '7px';
		titleContainer.style.fontsize = '36px';

		const input = titleContainer.getElementsByTagName('input')[0];
		input.focus();
		input.value = '';

		input.addEventListener('blur', (event) => this.saveNewBoardTitle(event));
	}

	saveNewBoardTitle(event) {
		const input = event.currentTarget;
		const titleContainer = input.parentElement;

		titleContainer.innerHTML = `<span class="title">${input.value}</span>`;
		titleContainer.style.padding = '30px 0';

		const updatedBoard = {
			name: input.value,
			id: this.board.id,
		};

		this.model.updateBoard(updatedBoard).then(boards => {
			this.board.name = updatedBoard.name;
		});
	}

	// addBoard() {
	// 	const newBoard = {
	// 		name: document.getElementsByClassName('board__header')[0].innerText,
	// 	};

	// 	return new Promise(() => this.model.addBoard(newBoard)
	// 		.then((addedBoard) => {
	// 			location.hash = '#/boards';
	// 		})
	// 		.catch(status => alert(`${status}`))
	// 	);
	// }

	dragOver(event) {
		event.preventDefault();
	}

	dragEnter(event) {
		event.preventDefault();

		const board = event.currentTarget;
		board.classList.add('hovered');
	}

	dragLeave(event) {
		const board = event.currentTarget;
		board.classList.remove('hovered');
	}

	dragDrop(event) {
		const replacedBoard = event.currentTarget;
		const boardsContainer = replacedBoard.parentElement;
		const tasksContainer = replacedBoard.getElementsByClassName('board__items')[0];
		const replacedTask = boardsContainer.getElementsByClassName('dragged')[0];

		tasksContainer.append(replacedTask);
		replacedTask.classList.remove('dragged');
		replacedBoard.classList.remove('hovered');
	}
}

export default Board;