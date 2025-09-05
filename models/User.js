const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true },
  lists:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }] // reference List documents
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
 userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const itemSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   done: { type: Boolean, default: false }
// });

// const listSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   items: [itemSchema]
// });

// const userSchema = new mongoose.Schema({
//   email:    { type: String, required: true, unique: true },
//   password: { type: String },
//   googleId:  { type: String, unique: true, sparse: true },
//   lists:    [listSchema] 
// });

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.matchPassword = async function(enteredPassword) {
//   if (!this.password) return false;
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model('User', userSchema);
