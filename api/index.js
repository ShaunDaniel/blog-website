import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import lodash from "lodash"
import Note from "./Note.js"
import mongoose from "mongoose"

const app = express()
const port = 3000
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static("public"))

const aboutContent = "A project made as a part of Web Development Bootcamp by Angela Yu"
const contactContent = "Contact me on - shaun.daniel@science.christuniversity.in."



app.get("/",async (req,res)=>{
    try{
        var posts = await Note.find({})
    res.render("home.ejs",{
        posts:posts
    })
    }
    catch(error){
        console.log("Error fetching posts:",error)
        res.status(500).send("Internal Server Error")
    }
    
})

app.get("/about",(req,res)=>{
    res.render("about.ejs",{
        abouttext:aboutContent
    })
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs",{
        contacttext:contactContent
    })
})

app.get("/compose",(req,res)=>{
    res.render("compose.ejs")
})

app.post("/compose",(req,res)=>{
    const note = new Note({
        note_title: req.body["note-title"],
        note_body: req.body["note-body"],
    })
    note.link = `/posts/${note._id}`
    note.save()
    res.redirect("/")
})

app.get("/posts/:postname", async(req, res) => {
    const post = await Note.findOne({link:`/posts/${req.params.postname}`});

    if (post) {
        res.render("post", {
            post: post
        });
    } else {
        res.render("post", {
            post: {
                note_title: "404!",
                note_body: "Post not found!"
            }
        });
    }
});



app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})