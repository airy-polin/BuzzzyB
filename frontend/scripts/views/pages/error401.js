import Component from '../component.js';

class Error404 extends Component {
	getData() {
		return new Promise(resolve => resolve());
	}
	
	render() {
		return new Promise(resolve => {
			resolve(`
				<div class="error">401 Error - Unauthorized</div>
			`);
		});
	}
}

export default Error404;