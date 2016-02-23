'use strict';
var express=require('express');
var app=express();

app.use(express.static('./'));

//get, post, delete, put, head
app.use(function(req,res,next){
	console.log('Middleware1');
	next();
});


app.get('/first',function(req,res,next){
	console.log('Middleware2 - First');
	res.send('First get One')
	next();
});

app.get('/first',function(req,res){
	console.log('First Request');
	res.send('First Get');
})

app.get('/second',function(req,res,next){
	console.log('Middleware2 - Second');
	next();
});

app.get('/second',function(req,res){
	console.log('Second Request');
	res.send('Hello');
});

app.get('/',function(req,res){
	res.status(201);
	res.send('Hello ${req.query.name}');
});

app.post('/',function(req,res){
	res.send('Hello world by POST');
});


app.route('/users')
	.get(function(req,res){
		res.send("Get Users");
	})
	.put(function(req,res){
		res.send("Put Users");
	})
	.post(function(req,res){
		res.send("Post Users");
	})
	.delete(function(req,res){
		res.send("Delete Users");
	});


var users=require('./users');
app.use('/routeUsers',users);



app.use(function(err,req,res,next){
	console.log('error catched');
	console.log(err);
});







var server=app.listen(3000,function(err){
	console.log("Listening on "+server.address().address+" at port "+ server.address().port);
});