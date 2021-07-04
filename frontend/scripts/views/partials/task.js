import {generateID} from "../../helpers/utils.js";

import Users from '../../models/users.js';
import Component from '../component.js';

class Task extends Component {
	constructor(taskName) {
		super();

		this.taskName = taskName;
		this.model = new Users();
	}

	getData() {
		return new Promise(resolve => resolve());
	}

	render() {
		return new Promise(resolve => {
			this.tabCount = 2;
			this.taskId = generateID();

			resolve(`
				<div class="board__item" id="${this.taskId}" tabindex=${this.tabCount} draggable="true">
					<span class="item__text">${this.taskName}</span>
					<img src="images/check-mark-green.svg" alt="check mark" />
				</div>
			`);
		});
	}

	afterRender() {
		// this.addTask();

		const boardTask = document.getElementById(this.taskId);

		boardTask.addEventListener('dblclick', (event) => this.toggleTask(event));
		boardTask.addEventListener('dragstart', (event) => this.dragStart(event));
		boardTask.addEventListener('dragend', (event) => this.dragEnd(event));
	}

	toggleTask(event) {
		const clickedTask = event.currentTarget;
		clickedTask.classList.toggle('cancelled');

		if (clickedTask.classList.contains('cancelled')) {
			clickedTask.innerHTML = `
			<span class="item__text">${this.taskName}</span>
			<img src="images/delete-mark.svg" alt="delete mark" />
			`;
		} else {
			clickedTask.innerHTML = `
			<span class="item__text">${this.taskName}</span>
			<img src="images/check-mark-green.svg" alt="check mark" />
			`;
		}
	}

	dragStart(event) {
		const draggedTask = event.currentTarget;

		setTimeout(() => {
			draggedTask.classList.add('hidden');
			draggedTask.classList.add('dragged');
		}, 0);
	}

	dragEnd(event) {
		const draggedTask = event.currentTarget;
		
		draggedTask.classList.remove('hidden');
		draggedTask.classList.remove('dragged');
	}

	// addTask() {
	// 	const boardTask = {
	// 		boardId: 'V1hELlfJ5',
	// 		name: document.getElementById(this.taskId).innerText,
	// 	};

	// 	this.model.addTask(boardTask);
	// }
}

export default Task;