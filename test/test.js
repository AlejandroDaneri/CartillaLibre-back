let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
const server = require('../app');

const aMedic = {
  name: "Medic",
  speciality: "surgery"
}

describe('Medics tests: ',()=>{
  before((done) =>{
    chai.request(server)
      .delete('/borratodo')
      .end(()=>done())
  })
  it('should ping', (done) => {
    chai.request(server)
      .get('/ping')
      .end( function(err,res){
        res.should.have.status(200);
        res.body.should.equal("Ping")
        done();
      });
  });

  it('GET medics should return an object', (done) => {
    chai.request(server)
      .get('/medics')
      .end( function(err,res){
        res.should.have.status(200);
        done();
      });
  });

  it('POST medics should return an object', (done) => {
    chai.request(server)
      .post('/medics')
      .set('Content-Type', 'application/json')
      .send(aMedic)
      .end( function(err,res){
        res.should.have.status(200);
        res.body.should.include(aMedic);
        done();
      });
  });

  it('POST duplicate medics should return an error', (done) => {
    chai.request(server)
      .post('/medics')
      .set('Content-Type', 'application/json')
      .send(aMedic)
      .end( function(err,res){
        res.should.have.status(400);
        done();
      });
  });

});



