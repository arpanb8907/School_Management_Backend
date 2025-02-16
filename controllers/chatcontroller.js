import Message from "../models/messages.js";

export const savemsg = async (req, res) => {
  const { sender, receiver, text } = req.body;

  try {
    if (!sender || !receiver || !text) {
      res.status(400).json({ error: "Missing fields" });
    }

    const newmsg = new Message({
      sender,
      receiver,
      text,
    });

    console.log("Saving message:", newmsg); // Debug log
    const savedmsg = await newmsg.save();
    res.status(201).json(savedmsg)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const fetch_msg = async(req,res)=>{

    const {sender,receiver} = req.query 

    if(!sender || !receiver){
        res.status(400).json({error : "sender or receiver is required"});
        return;
    }

    try {
        const msg = await Message.find({
            $or : [
                {sender,receiver},
                {sender : receiver , receiver : sender}
            ],

        }).sort({createdAt :1});
        console.log(msg)
        res.status(200).json(msg);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }

}