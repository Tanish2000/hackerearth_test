const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: path.resolve(__dirname, './.env') });
const PORT = process.env.PORT || 5000;

//Database imports
require('./db/connection');
const Image = require("./models/image");

app.use(express.json());
app.use(cors());


app.post("/", async(req,res)=> {
    try {
        console.log(req.body)
        const imageData = { 
            name : req.body.name,
            url : req.body.url,
            description : req.body.description
        }
        const newImage = new Image(imageData);
        await newImage.save();
        console.log(imageData);
        res.json("Image Uploaded");
    } catch (error) {
        res.json(error);
        console.log(error);       
    }
})


app.get("/getImages" , async(req,res)=> {
    try {
        res.status(200).json({
            status : 200,
            images : await Image.find()
        });
    } catch (error) {
        console.log(error);
    }
})

app.get("/getImageData/:id", async(req,res)=> {
    const { id } = req.params;
    try {
        const image = await Image.findOne({ _id : id });
        console.log(image);
        res.json(image);
    } catch (error) {
        console.log(error);
    }   
})

app.put("/update" ,async (req,res)=> {
    const { name , url  , description } = req.body;
     try{
        await Image.updateOne({ _id :mongoose.Types.ObjectId(req.body._id) } , { $set : { name, url , description } })
        res.json("Updated");
     }catch(err)
     {
        console.log(err)
     } 
})  

app.delete('/:id/delete' , async(req,res)=> {
    console.log(req.params);
    await Image.deleteOne({ _id : mongoose.Types.ObjectId(req.params.id) });
    res.json("Deleted");
})


if( process.env.NODE_ENV == "production")
{
    app.use(express.static("client/build"));    
    app.get("*" , (req,res)=> {
        res.sendFile(path.resolve('client' ,'build' , 'index.html'))
    })
}

app.listen(PORT, ()=> {
    console.log("Server running on port: " + PORT);
})