import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static("public"))

const homeStartingContent = "In id massa non metus efficitur fringilla in in leo. Phasellus lacinia gravida erat, non ullamcorper tortor blandit et. Donec tincidunt congue egestas. Morbi vel egestas lectus. Nunc ut congue odio, sit amet egestas justo. Quisque in aliquet risus. Aenean sit amet nunc lacinia, cursus odio ut, vulputate eros. In interdum sagittis odio scelerisque ultrices. Aenean congue, odio in eleifend luctus, tellus lorem vehicula nibh, in elementum velit ligula laoreet lacus. Praesent ultricies, felis quis tincidunt aliquet, augue est volutpat ex, id egestas diam risus eu velit. Nunc condimentum, libero sed ornare facilisis, justo nisi tristique urna, at lobortis ante neque eu metus. "
const aboutContent = "Integer ac nisl condimentum, mollis arcu quis, condimentum dui. In hac habitasse platea dictumst. Donec fringilla, ipsum cursus fringilla sodales, elit elit malesuada nunc, ac malesuada metus dui suscipit sem. Mauris mauris ipsum, tristique at viverra ut, pharetra vitae leo. Suspendisse facilisis sodales dui et dapibus. Sed massa nisl, pharetra non convallis vitae, finibus vitae justo. Cras in lorem et turpis fermentum porttitor eget ut erat."
const contactContent = "Duis sed auctor velit, in hendrerit eros. Integer egestas tellus a ligula suscipit, quis mattis lorem varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum mi ac porta ultricies. Praesent vitae efficitur est, et euismod turpis. Proin sollicitudin est et convallis malesuada. Praesent hendrerit turpis orci, sit amet accumsan tellus lobortis eu. Vivamus congue ligula mauris."



app.get("/",(req,res)=>{
    res.render("home.ejs",{
        hometext:homeStartingContent
    })
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


app.listen(port,"192.168.1.11",()=>{
    console.log(`Listening on port ${port}`)
})