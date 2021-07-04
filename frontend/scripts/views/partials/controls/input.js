class Input {
	static Type = {
		TEXT: 1,
		PASSWORD: 2,
	}

	constructor(labelName, type) {
		this.labelName = labelName;
		this.type = type;
	}

	render() {
		return `
			<div class="form__input">
				<label class="label" for="${this._getIdValue()}">${this.labelName}</label>
				<input class="input" type="${this._getType()}" id="${this._getIdValue()}" value="" required />
			</div>
		`;
	}

	_getType() {
		switch (this.type) {
			case Input.Type.TEXT: return "text";
			case Input.Type.PASSWORD: return "password";
		}
	}

	_getIdValue() {
		return this.labelName.toLowerCase().split(' ').join('-');
	}
}

export default Input;