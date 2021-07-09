import Component from '../component';

import { storage } from '../../data/storage';

import Users from '../../models/users';

class UserProfile extends Component {
	constructor() {
		super();

		this.model = new Users();
		this.user = storage.user;
	}

	render() {
		if (!this.user) {
			return '';
		}
		return `
			<div class="user__profile hidden">
				<span class="profile__name">${this.user.email}</span>
				<div class="profile__img">
					<img src="images/logo-bee.svg" alt="user" />
				</div>
			</div>
		`;
	}
}

export default UserProfile;