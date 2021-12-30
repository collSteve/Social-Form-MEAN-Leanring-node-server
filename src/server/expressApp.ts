import express, {Express} from "express";
import { Post, PostsGetRequestResponseObject, PostPostRequestObject, PostPostRequestResponseObject } from "../models/post.model";
import { PostDBType, PostModel } from "../models/postsMongoose.model";
import DataBase from "../DB/db";

const db_obj: DataBase = new DataBase();
db_obj.connectDB();

const expressApp:Express = express();

expressApp.use(express.json());
expressApp.use(express.urlencoded({
    extended: true
}));

expressApp.use((req, res, next)=>{
    const allowedOrigins = ["http://localhost:4200"];
    const origin = req.headers.origin;

    console.log(origin + " requested");
    if (typeof origin === "string" && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

expressApp.get("/test", (req,res)=>{
    return res.send("test successed");
});

expressApp.post("/api/posts", async (req, res, next)=>{
    const postObject: PostPostRequestObject = req.body;
    const newPost = postObject.post;

    const newPostDB = new PostModel(newPost);

    try {
        const savedPostDB = await newPostDB.save();
        const postRequestResponse: PostPostRequestResponseObject = {
            status: 201,
            message: "[Server] Post added succussfully!",
            addedPostSuccessful: true,
            post_id: savedPostDB._id.toString()
        }

        return res.status(201).json(postRequestResponse);
    } catch {
        const postRequestResponse: PostPostRequestResponseObject = {
            addedPostSuccessful: false,
            status: 500,
            message: "[Server] Fail to add Post!"
        }
        return res.status(500).json(postRequestResponse);
    }
})

expressApp.get("/api/posts", async (req, res, next)=>{

    const doc = await PostModel.find();

    const fetchedPosts:Post[] = [];
    doc.forEach((postDB: PostDBType)=>{
        fetchedPosts.push(DataBase.postDB2Client(postDB));
    });

    const requestObject: PostsGetRequestResponseObject = {
        message:"fetch request succeeded",
        posts: fetchedPosts,
        status: 200
    };

    return res.status(200).json(requestObject);
});

expressApp.delete("/api/posts/:id", async (req, res, next)=>{
    const result = await PostModel.deleteOne({_id: req.params.id});
    console.log(result);
    res.status(200).json({message:"post deleted!"});
});



export default expressApp;