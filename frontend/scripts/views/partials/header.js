import Component from '../component.js';

import UserProfile from '../partials/user-profile.js';

import { storage } from '../../data/storage.js';

import Users from '../../models/users.js';

class Header extends Component{
	constructor() {
		super();
		
		this.model = new Users();
	}

	getData() {
		return new Promise((resolve, reject) => {
			if (storage.user) {
				resolve();
			} else {
				this.model.getUser()
				.then(user => {
					storage.user = user;
					resolve();
				})
				.catch(() => {});
			}
		});
	}

	render() {
		return new Promise(resolve => {
			this.userProfile = new UserProfile();

			resolve(`
				${this.userProfile.render()}
			`);
		});
	}
}

export default Header;