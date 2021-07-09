import { parseRequestURL } from '../helpers/utils';

class Component {
	constructor() {
		this.request = parseRequestURL();
	}

	afterRender() {}
}

export default Component;