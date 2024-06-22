const mongoose= require("mongoose");
const url= "mongodb+srv://amitmishra4447:Hello@cluster0.vpplptl.mongodb.net/";

mongoose.connect(url)

const todoSchema= mongoose.Schema({
    title: String,
    description: String,
    priority: Number,
    completed: Boolean
})

const todo= mongoose.model('todos', todoSchema);
module.exports={
    todo
}