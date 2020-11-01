var sinon = require('sinon');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
const server = require('../app');
var Medic = require('../src/models/medics');

const aMedic = {
  name: "Medic",
  speciality: "surgery"
}

const bMedic = {
  name: "bMedic",
  speciality: "surgery"
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
    var Mock = sinon.mock(Medic);
    Mock.expects('find').yields(null, aMedic);
    chai.request(server)
      .get(`${baseMedics}`)
      .end(function (err, res) {
        Mock.verify();
        Mock.restore();
        res.should.have.status(200);
        res.body.should.include(aMedic);
        done();
      });
  });

  it('POST medics should return an object', (done) => {
    var Mock = sinon.mock(Medic);
    Mock.expects('find').yields(null, aMedic);
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(aMedic)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include(aMedic);
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

  it('POST medics without name should return 400', (done) => {
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send({speciality: "ex"})
      .end(function (err, res) {
        res.should.have.status(400);
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
    chai.request(server)
      .post(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(bMedic)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.include(bMedic);
        done();
      });
  });

  it('DELETE NOT existing medic should return error', (done) => {
    chai.request(server)
      .delete(`${baseMedics}`)
      .set('Content-Type', 'application/json')
      .send(bMedic)
      .end(function (err, res) {
        res.should.have.status(404);
        done();
      });
  });

});



