let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
const server = require('../app');

const aMedic = {
  name: "Medic",
  speciality: "surgery",
  rating:5
}

const bMedic = {
  name: "bMedic",
  speciality: "surgery",
  rating: 3
}

const cMedic = {
  name: "cMedic",
  speciality: "surgery",
  rating: 1
}

const baseMedics = '/medics'

describe('Medics tests: ', () => {
  before((done) => {
    chai.request(server)
      .delete(`${baseMedics}/borratodo`)
      .end((err,res) => {
        res.should.have.status(200);
        done()
      })
  })

  it('GET medics should return an object', (done) => {
    chai.request(server)
      .get(`${baseMedics}`)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.a('object');
        done();
      });
  });

  it('POST medics should return an object', (done) => {
    var toReceive = Object.assign({},aMedic)
    toReceive.rating = [toReceive.rating]
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(aMedic)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.deep.include(toReceive);
        done();
      });
  });

  it('POST duplicate medics should return an error', (done) => {
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(aMedic)
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });

  it('POST medics with incomplete body should return 400', (done) => {
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send({speciality: "ex"})
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });

  it('POST medics with negative rating should return 400', (done) => {
    var toSend = Object.assign({},aMedic)
    toSend.rating = -11
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(toSend)
      .end(function (err, res) {
        res.should.have.status(400);
        res.body.errors.should.have.lengthOf(1);
        res.body.errors[0].should.to.have.all.keys('value', 'msg','param','location');
        done();
      });
  });

  it('POST medics with too high rating should return 400', (done) => {
    var toSend = Object.assign({},aMedic)
    toSend.rating = 10
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(toSend)
      .end(function (err, res) {
        res.should.have.status(400);
        res.body.errors.should.have.lengthOf(1);
        res.body.errors[0].should.to.have.all.keys('value', 'msg','param','location');
        done();
      });
  });

  

  it('POST medics without speciality should return 400', (done) => {
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send({name: "ex"})
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });

  it('DELETE existing medic should return that medic', (done) => {
    var toReceive = Object.assign({},bMedic)
    toReceive.rating = [toReceive.rating]
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(bMedic)
      .end(function (err, res) {
        var id = res.body._id
        chai.request(server)
          .delete(`${baseMedics}/${id}`)
          .set('Content-Type', 'application/json')
          .end(function (err,res){
            res.should.have.status(200)
            res.body.should.deep.include(toReceive);
            done()
          })
      });
  });

  it('DELETE NOT existing medic should return error', (done) => {
    chai.request(server)
      .delete(`${baseMedics}/19sdf2`)
      .set('Content-Type', 'application/json')
      .end(function (err, res) {
        res.should.have.status(404);
        done();
      });
  });

  it('PATCH medics with correct body should works fine', (done) => {
    var toSend = Object.assign({},cMedic)
    toSend.rating = 5
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(toSend)
      .end(function (err, res) {
        var id =res.body._id
        toSend.rating = 4
        chai.request(server)
        .patch(`${baseMedics}/${id}`)
        .set('Content-Type', 'application/json')
        .send(toSend)
        .end(function (err,res){
          chai.request(server)
          .get(`${baseMedics}/${id}`)
          .set('Content-Type', 'application/json')
          .end(function (err,res){
            res.should.have.status(200)
            res.body.should.deep.property('rating',[5,4]);
            done()
          })
      });
    })
  });

});