let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
const server = require('../app');

describe('Tests: ',()=>{
  it('should ping', (done) => {
    chai.request(server)
      .get('/ping')
      .end( function(err,res){
        res.should.have.status(200);
        res.body.should.equal("Ping")
        done();
      });
  });
});



