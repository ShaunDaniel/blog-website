import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })


const noteSchema = new mongoose.Schema({
    note_title:String,
    note_body:String,
    link:String,
})

const Note = mongoose.model("note",noteSchema)


export default Note