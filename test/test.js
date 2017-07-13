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
			['firstItem'], 
			function(err, res) {
                res.should.have.status(200);
                res.text.should.be.a('string');
                res.text.should.have.string('firstItem');
                done();
			}
        );
    });
    it('should remove the item with id when /todo/delete/:id GET is called', function(done) {
		var chaiRequest = chai.request(server);
		addItems(
			chaiRequest,
			['secondItem', 'thirdItem'],
			() => {}	
		);	
		chaiRequest
		.get('/todo/delete/0')
		.end(function(err, res) {
			res.should.have.status(200);
			res.text.should.be.a('string');
			res.text.should.not.have.string('secondItem');
			res.text.should.have.string('thirdItem');
			done();
		});
	}); 
	it('should replace the item with id when /todo/edit/:id POST is called', function(done) {
		var chaiRequest = chai.request(server);
		addItems(
			chaiRequest,
			['fourthItem', 'fifthItem'],
			() => {}	
		);	
		chaiRequest
		.post('/todo/edit/0')
		.type('form')
		.send({editedtodo: 'sixthItem'})
		.end(function(err, res) {
			res.should.have.status(200);	
			res.text.should.be.a('string');
			res.text.should.not.have.string('fourthItem');
			res.text.should.have.string('sixthItem');
			res.text.should.have.string('fifthItem');
			done();
		});
	}); 
	it('should redirect to /todo on /nonsensepath GET', function(done){
		chai.request(server)
			.get('/nonsensepath')
			.end(function(err, res){
				res.should.have.status(200);
                res.text.should.be.a('string');
                res.text.should.have.string('<title>My todolist</title>');
                res.text.should.have.string('<h1>My todolist</h1>');
				res.redirects[0].should.match(/\/todo$/);
				done();	
			});
	});
});

function addItems(chaiRequest, items, callback) {
	if (items.length > 1) {
	   addItem(items.pop(), function() {addItems(chaiRequest, items, callback);});
    } else {
       addItem(items.pop(), callback);
    }
    function addItem(item, callback) {
		chaiRequest
			.post('/todo/add/')
			.type('form')
			.send({newtodo: item})
			.end(callback);
	}
}

