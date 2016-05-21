var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
  title  : String,
  body   : String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date },
  userId : [{type: Schema.Types.ObjectId, ref: 'User'}],
  comments         : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  color  : {type: String, default: "default"},
});


// MIDDLEWARE
PostSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});



var Post = mongoose.model('Post', PostSchema);

module.exports = Post;