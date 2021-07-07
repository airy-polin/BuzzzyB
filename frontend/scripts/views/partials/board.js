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
		this.tasks = this.board.tasks.map(task => new Task(task));

		return `
			<div class="board" id="${this.board.id}">
				<div class="board__header">
					<span class="title">${this.board.name}</span>
				</div>

				<div class="board__input">
					<input class="input invisible" type="text" value="" tabindex="2" />
				</div>

				<div class="board__items">
					${this.tasks.map(task => task.render()).join('')}
				</div>
			</div>
		`;
	}

	afterRender() {
		this.tasks.map(task => task.afterRender());

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
			this.addTask(input.value, board);
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
		titleContainer.classList.add('editable');

		const input = titleContainer.getElementsByTagName('input')[0];
		input.focus();
		input.value = '';

		input.addEventListener('blur', (event) => this.saveNewBoardTitle(event));
	}

	saveNewBoardTitle(event) {
		const input = event.currentTarget;
		const titleContainer = input.parentElement;

		titleContainer.innerHTML = `<span class="title">${input.value}</span>`;
		titleContainer.classList.remove('editable');

		const updatedBoard = {
			name: input.value,
			id: this.board.id,
		};

		this.model.updateBoard(updatedBoard).then(boards => {
			this.board.name = updatedBoard.name;
		});
	}

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

	addTask(taskName, boardElement) {
		const newTask = {
			boardId: this.board.id,
			name: taskName,
		};

		let task;
		this.model.addTask(newTask)
			.then(addedTask => {
				task = new Task(addedTask);
				return task.render();
			})
			.then(html => {
				const containerToAddRecord = boardElement.getElementsByClassName('board__items')[0];
				containerToAddRecord.insertAdjacentHTML('beforeend', html);
				task.afterRender();
				this.tabCount++;
			});
	}
}

export default Board;