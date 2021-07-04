class Users {
	registerUser(newUser) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/signup');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => {
				if (xhr.status < 400) {
					resolve(JSON.parse(xhr.response));
				} else {
					reject(xhr.status);
				}
			}
			xhr.send(JSON.stringify(newUser));
		});
	}

	loginUser(user) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/login');
			xhr.setRequestHeader('Content-Type', 'application/json');

			xhr.onload = () => {
				if (xhr.status < 400) {
					resolve(JSON.parse(xhr.response));
				} else {
					reject(xhr.status);
				}
			}
			xhr.send(JSON.stringify(user));
		});
	}

	getUser() {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/user');
			xhr.withCredentials = true;

			xhr.onload = () => {
				if (xhr.status < 400) {
					resolve(JSON.parse(xhr.response));
				} else {
					reject(xhr.status);
				}
			}

			xhr.send();
		});
	}

	getBoards() {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('GET', 'http://localhost:3000/api/boards');
			xhr.withCredentials = true;

			xhr.onload = () => {
				if (xhr.status < 400) {
					resolve(JSON.parse(xhr.response));
				} else {
					reject(xhr.status);
				}
			}

			xhr.send();
		});
	}

	updateBoard(updatedBoard) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/boards/update');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.withCredentials = true;

			xhr.onload = () => {
				if (xhr.status < 400) {
					resolve();
				} else {
					reject(xhr.status);
				}
			}

			xhr.send(JSON.stringify(updatedBoard));
		});
	}

	addBoard(newBoard) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open('POST', 'http://localhost:3000/api/boards/add');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.withCredentials = true;

			xhr.onload = () => {
				if (xhr.status < 400) {
					resolve(JSON.parse(xhr.response));
				} else {
					reject(xhr.status);
				}
			}

			xhr.send(JSON.stringify(newBoard));
		});
	}

	// addTask(newTask) {
	// 	return new Promise((resolve, reject) => {
	// 		const xhr = new XMLHttpRequest();

	// 		xhr.open('POST', 'http://localhost:3000/api/boards/update');
	// 		xhr.setRequestHeader('Content-Type', 'application/json');
	// 		xhr.withCredentials = true;

	// 		xhr.onload = () => {
	// 			if (xhr.status < 400) {
	// 				resolve(JSON.parse(xhr.response));
	// 			} else {
	// 				reject(xhr.status);
	// 			}
	// 		}

	// 		xhr.send(JSON.stringify(newTask));
	// 	});
	// }
}

export default Users;