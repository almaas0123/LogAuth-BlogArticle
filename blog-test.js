'use strict';
var app=require('./blog-app');
var supertest=require('supertest-session');
var should=require('should');

describe('Testing Blog APIs',function(){
	it('Get blog details api should return error 401 if login does not exists',function(done){
		supertest(app)
			.get('/blogs/1')
			.expect(401)
			.end(function(err,response){
				response.status.should.be.equal(401);
				done();
			});
	});

	it('Get Blog Details api should return blog details if blog exists',function(done){
		var req=supertest(app);
		req
			.post('/login')
			.set('Content-Type','application/json')
			.send({username:'mohnish'})
			.expect(200)
			.end(function(err,response){
				response.status.should.be.equal(200);
				req
					.get('/blogs/568f845316099856f1cdfdf9')
					.expect(200)
					.end(function(err,response){
						response.status.should.be.equal(200);
						response.body.title.should.not.be.empty();
						done();
					});
			});

	});

	it('Get Blog details api should return error 404 if blog does not exists',function(done){
		var req=supertest(app);
		req
			.post('/login')
			.set('Content-Type','application/json')
			.send({username:'mohnish'})
			.expect(200)
			.end(function(err,response){
				response.status.should.be.equal(200);
				req
					.get('/blogs/1')
					.expect(404)
					.end(function(err,response){
						response.status.should.be.equal(404);
						done();
					});

			});
	})
});
