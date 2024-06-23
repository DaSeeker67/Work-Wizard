const { updateTodo,createTodo,deleteTodo } = require("./types");
const {todo} = require("./db");
const express = require('express');
const cors= require("cors");
const app = express();
app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET","PUT"],
    credentials: true

}));



app.use(express.json());
app.post('/todo', async function(req,res){
    const createPayload= req.body;
    const parsedPayload= createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        console.log(parsedPayload);
        res.status(411).json({
            msg: "you sended the wrong input",
    })
    return;
    }
   await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        priority: createPayload.priority,
        completed: false
    })
    res.status(200).json({
        msg:"Todo created!",
    })


});
app.get('/todos',async function(req,res){
    const todos= await todo.find({})
    res.json({
        todos
    })


});
app.put('/delete',async function(req,res){
    const createPayload= req.body;
    const parsePayload= deleteTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: "you sended wrong input",
        })
    }
    await todo.deleteOne({
        _id:req.body.id},
    )
    res.status(200).json({
        msg:"Todo Deleted Successfully",
    })
})

app.put('/completed',async function(req,res){
    const updatePayload= req.body;
    const parsePayload= updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg:"you sended wrong input",
        })
    }
    await todo.updateOne({
        _id:req.body.id},{
            completed:true,
        }
    )
    res.json({
        msg: "Todo marked as completed"
    })


});

app.listen(3000)