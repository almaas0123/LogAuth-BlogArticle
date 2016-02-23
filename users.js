'use strict';
var express=require('express');
var route=express.Router();

route.use(function(req,res,next){
	console.log('...do some checking and go on');
	throw 'new error';
	next();
});
route.get('/',function(req,res){
	res.send("Get Route Users")
});

route.put('/',function(req,res){
	res.send("Put Route Users")
});

route.post('/',function(req,res){
	res.send("Post Route Users")
});

route.delete('/',function(req,res){
	res.send("Delete Route Users")
});

module.exports=route;