var supertest = require("supertest");
var should    = require("should");

// This agent refers to PORT where program is runninng.
let url = "http://localhost:4000";

var server = supertest.agent(url);

describe("Index unit test",function(){

  // #1 should return home page

  it("should return home page",function(done){

    // calling home page api
    server
    .get("/")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
      res.status.should.equal(200);
      // Error key should be false.
      res.body.error.should.equal(false);
      done();
    });
  });

});


describe("get results",function(){

  // #1 should return home page

  it("competitions should return status 200",function(done){
      server
      .get('/competitions')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        done();
      });
  });

  it("team should return status 200",function(done){
      server
      .get('/team')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        done();
      });
  });

  it("team detail should return status 200",function(done){
      server
      .get('/team/57')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        done();
      });
  });

  it("players should return status 200",function(done){
      server
      .get('/players')
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        done();
      });
  });

});


describe("test errors",function(){

  // #1 should return home page

  it("router not found",function(done){
      server
      .get('/loremipsum')
      .expect("Content-type",/json/)
      .expect(404)
      .end(function(err,res){
        res.status.should.equal(404);
        done();
      });
  });

  it("data empty",function(done){
      server
      .get('/team/10000')
      .expect("Content-type",/json/)
      .expect(404)
      .end(function(err,res){
        res.status.should.equal(404);
        done();
      });
  });
});