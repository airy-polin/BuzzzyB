import { parseRequestURL } from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';

import Preloader from './views/partials/preloader.js';
import MainPage from './views/pages/main.js';
import SignUpPage from './views/pages/signup.js';
import LoginPage from './views/pages/login.js';
import Boards from './views/pages/boards.js';
import NewBoardConstructor from './views/pages/add-new-board.js';

import Error401 from './views/pages/error401.js';
import Error404 from './views/pages/error404.js';


const Routes = {
	'/': MainPage,
	'/signup': SignUpPage,
	'/login': LoginPage,
	'/boards': Boards,
	'/boards/add': NewBoardConstructor,
	'/error401': Error401,
};

function router() {
	const headerContainer = document.getElementsByClassName('header')[0],
		contentContainer = document.getElementsByClassName('content__manager')[0],
		footerContainer = document.getElementsByClassName('footer')[0],
		header = new Header(),
		preloader = new Preloader(),
		footer = new Footer();

	const request = parseRequestURL(),
		parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
		page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

	header.getData().then(data => {
		header.render(data).then(html => {
			headerContainer.innerHTML = html;
			header.afterRender();
		});
	});

	preloader.render().then(html => {
		contentContainer.innerHTML = html;
		preloader.afterRender();
	});
	
	page.getData().then(data => {
		page.render(data).then(html => {
			preloader.finish();
			contentContainer.innerHTML = html;
			page.afterRender();
		});
	});

	footer.render().then(html => footerContainer.innerHTML = html);
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);