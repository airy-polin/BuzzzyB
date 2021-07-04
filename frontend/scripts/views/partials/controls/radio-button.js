import {generateID} from "../../../helpers/utils.js";

class RadioButton {
	constructor(firstLabelName, secondLabelName, isFirstActive) {
		this.firstLabelName = firstLabelName;
		this.secondLabelName = secondLabelName;
		this.isFirstActive = isFirstActive;
	}

	render() {
		this.radioButtonId = generateID();

		return `
			<div class="form__toggle" id="${this.radioButtonId}">
				<div class="toggle__item ${this.isFirstActive ? 'checked' : ''}">
					<input id="${this._getIdValue(this.firstLabelName)}" type="radio" name="slide" ${this.isFirstActive ? 'checked' : ''}>
					<label for="${this._getIdValue(this.firstLabelName)}">${this.firstLabelName}</label>
				</div>

				<div class="toggle__item ${!this.isFirstActive ? 'checked' : ''}">
					<input id="${this._getIdValue(this.secondLabelName)}" type="radio" name="slide" ${this.isFirstActive ? 'checked' : ''}>
					<label for="${this._getIdValue(this.secondLabelName)}">${this.secondLabelName}</label>
				</div>
			</div>
		`;
	}

	_getIdValue(label) {
		return label.toLowerCase().split(' ').join('-');
	}

	afterRender() {
		const buttons = document.getElementsByClassName('toggle__item');
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', (event) => this.activateRadioButton(event));
		}
	}

	activateRadioButton(event) {
		const clickedRadio = event.currentTarget;
		console.log(clickedRadio);

		const radioButtons = document.getElementsByClassName('toggle__item');
		for (let i = 0; i < radioButtons.length; i++) {
			radioButtons[i].classList.toggle('checked');
		}
		location.hash = this.toggleHash();
	}

	toggleHash() {
		switch (location.hash) {
			case '#/signup': return '#/login';
			case'#/login': return '#/signup';
		}
	}
}

export default RadioButton;