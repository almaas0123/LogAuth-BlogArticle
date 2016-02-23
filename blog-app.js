var express=require('express');
var app=express();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var session=require('express-session');

var MongoStore=require('connect-mongo')(session);

//Init mongoose connection
mongoose.connect('mongodb://localhost/blogs');
var Blog=mongoose.model('Blog',{
	title:'String',
	content:'String',
	author:'String'
});
global.Blog=Blog;

//Add Body parser
app.use(bodyParser.json({type:'application/json'}));
app.use(session({
	secret:'tiest9383D829d',
	resave:true,
	saveUninitialized:true,
	store:new MongoStore({mongooseConnection:mongoose.connection})
}));

var blogController=require('./blog');
app.use('/blogs',blogController);


app.post('/login',function(req,res){
	if(req.body.username=='dipesh'){
		req.session.isLoggedIn = 'Y';
		req.session.user = 'Dipesh';
		res.send('Success');
	}else{
		res.status(500);
		res.end();
	}
});

app.get('/logout', function(req,res){
	req.session.destroy();
	res.status(205);
	res.end();
});

module.exports=app;

