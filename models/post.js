var mongoose = require('mongoose');

var Post = mongoose.model('Post', {		
	title: String,
	body: String,
});

module.exports = Post;	