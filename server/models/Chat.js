import mongoose from "mongoose";
var Schema = mongoose.Schema;


const ChatSchema = new Schema({
  messageKey:String,
  sender:String,
  receiver:String,
  text:String,
  time:String
});

const Chat = mongoose.model("Chat", ChatSchema);


export default Chat;
