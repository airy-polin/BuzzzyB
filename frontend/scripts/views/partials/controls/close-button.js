import { generateID } from '../../../helpers/utils.js';

class CloseButton {
	constructor(onClickHandler) {
		this.onClickHandler = onClickHandler;
	}

	render() {
		this.buttonId = generateID();

		return `
			<button id="${this.buttonId}" class="button--close" type="button">
				<span></span>
			</button>
		`;
	}

	afterRender() {
		const closeButton = document.getElementById(this.buttonId);
		closeButton.addEventListener('click', this.onClickHandler);
	}
}

export default CloseButton;