var http = require("http"),
	express = require("express"),
	socket = require("socket.io"),
	request = require("request"),
	url = require("url"),
	app = express(),
	server = http.createServer(app),
	io = socket.listen(server);

app.set('views', __dirname + '/views');

app.get('/', function(req, res){
	res.render('index.ejs', {
		title: 'Chat it Up'
	});
});

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(client){

	console.log("client connected");
	
	client.on("join", function(name){
	
		client.nickname = name;
	
	});
	
	client.on("messages", function(message){
	
		io.sockets.emit("chat", [client.nickname, message]);
		
	});
	
});

server.listen(process.env.PORT || 5050);