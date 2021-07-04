const express = require('express'),
	  bodyParser = require('body-parser'),
	  morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dbFilePath = 'users.json',
	  app = express(),
	  cookieParser = require('cookie-parser'),
	  cookie = require('cookie');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3333');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.use(cookieParser('secret key'));

app.post('/api/signup', (req, res) => {
	const usersData = getUsersFromDB(),
		user = req.body;

	user.id = shortId.generate();
	user.boards = [];

	usersData.push(user);
	setUsersToDB(usersData);

	res.send(user);
});

app.post('/api/login', (req, res) => {
	const usersData = getUsersFromDB(),
		user = req.body;

	let loginUser = usersData.find(u => u.email === user.email && u.password === user.password);

	if (loginUser){
		res.send(loginUser);
	} else {
		res.status(401);
		res.send();
	}
});

app.get('/api/user', (req, res) => {
	const usersData = getUsersFromDB();

	let user = usersData.find(user => user.id === req.cookies['userToken']);

	res.send({
		id: user.id,
		email: user.email,
	});
});

app.get('/api/boards', (req, res) => {
	const usersData = getUsersFromDB();

	let user = usersData.find(user => user.id === req.cookies['userToken']);

	res.send(user.boards);
});

app.post('/api/boards/update', (req, res) => {
	const usersData = getUsersFromDB(),
		board = req.body;

	let user = usersData.find(user => user.id === req.cookies['userToken']);
	let updatedBoard = user.boards.find(b => b.id === board.id);
	updatedBoard.name = board.name;

	setUsersToDB(usersData);

	res.send();
});


app.post('/api/boards/add', (req, res) => {
	const usersData = getUsersFromDB(),
		newBoard = req.body;

	let user = usersData.find(user => user.id === req.cookies['userToken']);

	newBoard.id = shortId.generate();
	newBoard.tasks = [];
	user.boards.push(newBoard);

	setUsersToDB(usersData);

	res.send(newBoard);
});

// app.post('/api/boards/update', (req, res) => {
// 	const usersData = getUsersFromDB(),
// 		newTask = req.body;

// 	console.log(req.cookies['userToken']);
// 	let user = usersData.find(user => user.id === req.cookies['userToken']);
// 	let boardIndex = user.boards.findIndex(board => board.id === newTask.boardId);

// 	newTask.id = shortId.generate();
// 	user.boards[boardIndex].tasks.push(newTask);

// 	setUsersToDB(usersData);

// 	res.send(newTask);
// });

function getUsersFromDB() {
	return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setUsersToDB(usersData) {
	fs.writeFileSync(dbFilePath, JSON.stringify(usersData));
}

app.listen(3000, () => console.log('Server has been started...'));