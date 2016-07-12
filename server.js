var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/postList');		
mongoose.Promise = Promise;								

var app = express();
app.use(bodyParser());									
app.use(express.static('./public'));					

app.listen(8080, function() {
	console.log('Listening at http://localhost:8080');
});



var Post = require('./models/post');						

app.get('/posts', function(req,res) {					
	Post.find().sort({body:-1}).exec().then(function(posts) {		
		res.json(posts);			
	});
});

app.post('/posts', function(req,res) {			
	var post = req.body;							
	if(post._id) {								
		Post.findOneAndUpdate({_id:post._id}, post).exec().then(function() {	
			res.json(true);						
		});
	} else {									
		var newPost = new Post(post);				
		newPost.save().then(function() {			
			res.json(true);						
		});
	} 
});

app.post('/posts/delete', function(req,res) {			
	var post = req.body;															
	Post.findOneAndRemove({_id:post._id}).exec().then(function() {
		res.json(true);
	}) 
}); 