import Component from '../component.js';

class Error404 extends Component {
	render() {
		return new Promise(resolve => {
			resolve(`
				<div class="error">404 Error - Page Not Found</div>
			`);
		});
	}
}

export default Error404;