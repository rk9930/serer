const express = require("express")
const app = express()
const cors=require("cors");
const multer = require('multer')

// avoid cors policy error
app.use(cors({
    origin:"*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

// save image file to server
const storage = multer.diskStorage({
    destination:(req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename:(req,file, callBack)=>{
        callBack(null, `${file.originalname}`)
    }
})

let upload = multer({dest:'uploads/'})

app.post('/post',upload.single('file'), (req,res, next)=>{
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new Error('no file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)

    console.log(req.body.Title)
    console.log(req.body.Description)
    console.log(req.body.Date)
})
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("ratnesh here get request called")

})


// app.post("/post" , function(req, res){
//     // console.log(req.body.Title)
//     // console.log(req.body.Desc),
//     // console.log(req.body.Date),
//     // console.log(req.file)
//     res.send("ratnesh here post request called")
// })

app.listen(8000, ()=>{
    console.log("server is started at port 8000")
})


