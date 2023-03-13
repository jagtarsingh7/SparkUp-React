import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const receiveMessage = async (req, res) => {
    try {
        const { emailSender, emailReceiver } = req.query;

        console.log('req.user.email------>',req.user.email)
        const m1 = emailSender;
        console.log("emailSender-->",emailSender)
        const m2 = emailReceiver;
        console.log("emailReceiver-->",emailReceiver)

        const regex = new RegExp(`^(${m1}${m2}|${m2}${m1})$`);

        //console.log(" mKey  --->",mKey)
       //const user = await User.findOne({ email: emailSender });
       console.log('regex------>',regex)

        Chat.find({ messageKey: regex}, (err, userChat) => {
            if (err) {
                console.error("err");
                return;
            }
            console.log(" api hit----> userChat",userChat)

            res.status(200).json(userChat);
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { emailSender, emailReceiver, message } = req.body;

        const mKey = emailSender + emailReceiver;
        console.log("emailSender-->",emailSender)
        console.log("emailReceiver-->",emailReceiver)

        const textMessage = message;

        // const user = await User.findOne({ email: emailSender });

        const chat = new Chat({
            messageKey: mKey,
            sender:emailSender,
            receiver:emailReceiver,
            text: textMessage,
            time: new Date().toLocaleString()

        });
        Chat.create(chat, (err, chatMessage) => {
            if (err) {
                console.error("err");
                return;
            }

            res.status(200).json({ chatMessage });

            console.log(chatMessage); 
        });
           } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
