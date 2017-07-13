var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
describe('To-Do Lists', function() {
    it('/todo GET should return a page with title My todolist and a heading My todolist', function(done) {
        chai.request(server)
            .get('/todo')
			.end(function(err, res){
                res.should.have.status(200);
                res.text.should.be.a('string');
                res.text.should.have.string('<title>My todolist</title>');
                res.text.should.have.string('<h1>My todolist</h1>');
                done();
            });
    });
    it('/todo/add POST with newtodo as parameter should return a page with the new item in it', function(done) {
		var chaiRequest = chai.request(server);
		addItems(
			chaiRequest,
			['testToDoItem'], 
			function(err, res) {
                res.should.have.status(200);
                res.text.should.be.a('string');
                res.text.should.have.string('testToDoItem');
                done();
			}
        );
    });
    it('should remove the item with id when /todo/delete/:id GET is called', function(done) {
		var chaiRequest = chai.request(server);
		addItems(
			chaiRequest,
			['firstItem', 'secondItem'],
			function() {
				chaiRequest
				.get('/todo/delete/0')
				.end(function(err, res) {
					console.log(res);
					console.log(err);
					res.should.have.status(200);
					res.text.should.be.a('string');
					//res.text.should.not.have.string('');
				});
				done();
			}
		);	
	}); 
	it('should replace the item with id in the list with the item passed as parameter editedtodo when /todo/edit/:id is called'); 
	it('should redirect to /todo if page not found');
});

function addItems(chaiRequest, items, callback) {
	if (items.length > 1) {
		return addItem(items.pop(), addItems(chaiRequest, items, callback));
	} else {
		return addItem(items.pop(), callback);
	}

	function addItem(item, callback) {
		return chaiRequest
			.post('/todo/add/')
			.type('form')
			.send({newtodo: item})
			.end(callback);
	}
}
