const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
let students = require("./InitialData");

app.get("/api/student",(req,res)=>{
    res.status(200).json(students);
})

app.get("/api/student/:id",(req,res)=>{
    let studentId = req.params.id;
    let student = students.find(student => student.id == studentId);
    if(student){
        res.status(200).json(student)
    }else{
        res.status(400).json({
            messege:"fetching failed",
        })
    }
})

app.post("/api/student",(req,res)=>{
    let student = req.body;
    if(student){
        let newStudent = {
            id:student.id,
            name:student.name,
            currentclCass:student.currentClass,
            division:student.division
        }
        students.push(newStudent);
        res.status(200).json({
            messege:newStudent.id+"added",
        })
    }else{
    res.status(400).json({
        messege:"student adding failed",
    })
    }
    
});

app.put("/api/student/:id",(req,res)=>{

     let studentId = req.params.id;
     let newContent = req.body.name;

    let foundStudent =  students.find(student => studentId == student.id)
            console.log(foundStudent);
    if(foundStudent){
        foundStudent.name = newContent;
        res.status(200).json({foundStudent});
    }else{
        res.status(400).json({
            messege:"data not found",
        })
    }
})


app.delete("/api/student/:id", (req,res)=>{
    let studentId = req.params.id;
    let x = students.findIndex(stu => stu.id == studentId)
    let resutls = students.splice(x,1);
    res.status(200).json({
        messege:"deleted successfull",
        data:resutls,
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   