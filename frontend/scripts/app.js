import { parseRequestURL } from './helpers/utils';

import Header from './views/partials/header';
import Footer from './views/partials/footer';

import Preloader from './views/partials/preloader';
import MainPage from './views/pages/main';
import SignUpPage from './views/pages/signup';
import LoginPage from './views/pages/login';
import Boards from './views/pages/boards';
import NewBoardConstructor from './views/pages/add-new-board';

import ErrorPage from './views/pages/error-page';
import Error404 from './views/pages/error404';

import { storage } from './data/storage';

const Routes = {
	'/': MainPage,
	'/signup': SignUpPage,
	'/login': LoginPage,
	'/boards': Boards,
	'/boards/add': NewBoardConstructor,
	'/error': ErrorPage
};

function router() {

	try {
		const headerContainer = document.getElementsByClassName('header')[0],
			contentContainer = document.getElementsByClassName('content')[0],
			footerContainer = document.getElementsByClassName('footer')[0],
			header = new Header(),
			preloader = new Preloader(),
			footer = new Footer();

		const request = parseRequestURL(),
			parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
			page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

		header.getData()
			.then(data => header.render(data))
			.then(html => {
				headerContainer.innerHTML = html;
				header.afterRender();
			})
			.catch(handleException);

		preloader.render()
			.then(html => {
				contentContainer.innerHTML = html;
				preloader.afterRender();
			})
			.catch(handleException);

		page.getData()
			.then(data => page.render(data))
			.then(html => {
				preloader.finish();
				contentContainer.innerHTML = html;
				page.afterRender();
			})
			.catch(handleException);

		footer.render()
			.then(html => footerContainer.innerHTML = html)
			.catch(handleException);
	} catch (error) {
		handleException(error);
	}
}

function handleException(error) {
	storage.error = error;
	location.hash = '#/error';
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);