
var controller = require("../controllers/front.controller.ts");
let myChai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = myChai.should();

myChai.use(chaiHttp);

describe('Check Shila Point', () => {
  it('should equal zero for request without address', function(done) {
    myChai.request(server)
    .post('/front/get-shila-point')
    .send({
      'address': '0x'
    })
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('amount');
      res.body.should.have.property('status');
      res.body.amount.should.equal(0);
      res.body.status.should.equal(true);
      done();
    });
  });
});