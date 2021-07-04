import {generateID} from "../../../helpers/utils.js";

class Button {
	static Type = {
		PRIMARY: 1,
		SECONDARY: 0,
	}

	static Size = {
		BIG: 1,
		SMALL: 0,
	}

	constructor(name, type, size, onClickHandler, link) {
		this.name = name;
		this.type = type;
		this.size = size;
		this.onClickHandler = onClickHandler;
		this.link = link;
	}

	render() {
		this.buttonId = generateID();

		return `
			<div action="" class="builder__button">
				<button id=${this.buttonId} class="${this._getTypeClass()} ${this._getSizeClass()}" type="button">${this.name}</button>
			</div>
		`;
	}

	afterRender() {
		const button = document.getElementById(this.buttonId);
		if (this.onClickHandler) {
			button.addEventListener('click', this.onClickHandler);
		}
		if (this.link) {
			button.addEventListener('click', () => this._redirect());
		}
	}

	_redirect() {
		location.hash = this.link;
	}

	_getTypeClass() {
		switch (this.type) {
			case Button.Type.PRIMARY: return "button--primary";
			case Button.Type.SECONDARY: return "button--secondary";
		}
	}

	_getSizeClass() {
		switch (this.size) {
			case Button.Size.BIG: return "button--big";
			case Button.Size.SMALL: return "button--small";
		}
	}
}

export default Button;