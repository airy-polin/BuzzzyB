import Component from '../component';

import InitializationButtons from '../partials/initialization-buttons';

class MainPage extends Component {
	getData() {
		return new Promise(resolve => resolve());
	}

	render() {
		return new Promise(resolve => {
			this.initializationButtons = new InitializationButtons();

			resolve(`${this.initializationButtons.render()}`);
		});
	}

	afterRender() {
		this.initializationButtons.afterRender();
	}
}

export default MainPage;