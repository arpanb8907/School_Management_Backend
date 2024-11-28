import express from 'express'
import cors from 'cors'

// mongodb+srv://arpanbhowmick1312:a5kXatFBSoNsd4DF@cluster0.m97in.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const Corsoptions = {
    origin : 'http://localhost:3000',
};

const port = 5000
const app = express();
app.use(cors(Corsoptions))


app.get('/',(req,res)=>{

    res.json([
        {id:1,name:'John',age:23},
        {id:2,name:'Ben',age:27}
    ]);
});

// start the server

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})