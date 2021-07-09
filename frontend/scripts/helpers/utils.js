export const parseRequestURL = () => {
	const url = location.hash.slice(2),
		request = {};

	[request.resource, request.action, request.id] = url.split('/');

	return request;
};

export const generateID = () => {
	return Math.random().toString(36).substr(2, 10);
};