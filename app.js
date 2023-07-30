import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import lodash from "lodash"
import Note from "./Note.js"
import mongoose from "mongoose"

const app = express()
const port = 3000
mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static("public"))

const aboutContent = "Integer ac nisl condimentum, mollis arcu quis, condimentum dui. In hac habitasse platea dictumst. Donec fringilla, ipsum cursus fringilla sodales, elit elit malesuada nunc, ac malesuada metus dui suscipit sem. Mauris mauris ipsum, tristique at viverra ut, pharetra vitae leo. Suspendisse facilisis sodales dui et dapibus. Sed massa nisl, pharetra non convallis vitae, finibus vitae justo. Cras in lorem et turpis fermentum porttitor eget ut erat."
const contactContent = "Duis sed auctor velit, in hendrerit eros. Integer egestas tellus a ligula suscipit, quis mattis lorem varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum mi ac porta ultricies. Praesent vitae efficitur est, et euismod turpis. Proin sollicitudin est et convallis malesuada. Praesent hendrerit turpis orci, sit amet accumsan tellus lobortis eu. Vivamus congue ligula mauris."



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