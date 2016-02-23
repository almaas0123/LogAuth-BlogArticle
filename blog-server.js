'use strict';
var app=require('./blog-app');
var server=app.listen(3000,function(err){
	if(err){
		console.log("Error starting blog server");
		console.log(err);
	}else{
		console.log("Blog Server running on port ${server.address().port}");
	}
});
//console.log("Hello");