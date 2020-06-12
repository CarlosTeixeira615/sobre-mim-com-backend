const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');

server.use(express.static('public'));

server.set('view engine', 'njk');
nunjucks.configure('views', {
	express: server,
	autoescape: false,
	noCache: true
});

server.get('/', function(req, res) {
	const sobre = {
		avatar_url:
			'https://scontent-gru1-1.xx.fbcdn.net/v/t1.0-9/p960x960/77245182_2484497598334511_6295322415459205120_o.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=rpr6x6ecQzgAX9-HMro&_nc_ht=scontent-gru1-1.xx&_nc_tp=6&oh=97565fcbffc99c90353510fe1a537d78&oe=5EE037C7',
		name: 'Carlos Teixeira',
		role: 'me respondeuuuuu',
		description: 'vou ser foda ainda na <a class=red href="https://google.com.br" target="_blank">programaçao</a>',
		links: [
			{ name: 'github', url: 'https://github.com/CarlosTeixeira615' },
			{ name: 'Twitter', url: 'https://twitter.com' },
			{ name: 'Linkedin', url: 'https://br.linkedin.com' }
		]
	};
	return res.render('sobre', { sobre });
});

server.get('/portifolio', function(req, res) {
	return res.render('portifolio', { items: videos });
});

server.get('/video', function(req, res) {
	const id = req.query.id;
	const video = videos.find(function(video) {
		return video.id == id;
	});

	if (!video) {
		return res.send('video not found!');
	}
	return res.render('video', { item: video });
});

server.listen(5000, function() {
	console.log('server is online');
});

server.use(function(req, res) {
	res.status(404).render('not-found');
});
