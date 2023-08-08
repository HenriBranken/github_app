let expect = require("chai").expect;
let request = require("request");

describe("Status and Content of ", function () {
  it("status", function (done) {
    request(
      "http://localhost:8000/get-limit",
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });
  it("content", function (done) {
    request(
      "http://localhost:8000/get-limit",
      function (error, response, body) {
        expect(body).to.include("reset");
        done();
      }
    );
  });
});
