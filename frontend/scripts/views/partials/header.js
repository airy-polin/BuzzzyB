import Component from '../component';

import UserProfile from '../partials/user-profile';

import { storage } from '../../data/storage';

import Users from '../../models/users';

class Header extends Component{
	constructor() {
		super();

		this.model = new Users();
	}

	getData() {
		return new Promise((resolve) => {
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