import express from "express";
import DataBase from "../../DB/db";
import { Post, PostGetRequestResponseObject, PostPostRequestObject, PostPostRequestResponseObject, 
    PostPutRequestResponseObject, PostsGetRequestResponseObject } from "../../models/post.model";
import { PostDBType, PostModel } from "../../models/postsMongoose.model";

const router = express.Router();


router.post("", async (req, res, next)=>{
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

router.get("", async (req, res, next)=>{

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

router.delete("/:id", async (req, res, next)=>{
    try {
        const result = await PostModel.deleteOne({_id: req.params.id});
        console.log(result);
        return res.status(200).json({message:"post deleted!"});
    } catch {
        return res.status(500).json({message:"post delete failed!"});
    }
    
});

router.get("/:id", async (req, res, next)=>{
    // console.log("Get single post requested");
    const result = await PostModel.findById(req.params.id);
    if (result) {
        let response: PostGetRequestResponseObject = {
            post: DataBase.postDB2Client(result),
            status: 200,
            fetchSucceed: true
        };
        // console.log("single post id: "+DataBase.postDB2Client(result).id);
        return res.status(200).json(response);
    }
    let response: PostGetRequestResponseObject = {
        status: 505,
        fetchSucceed: false
    };
    return res.status(505).json(response);
});

router.put("/:id", async (req, res, next)=>{
    const postDB = DataBase.postClient2DBModel(req.body.post, true);
    try {
        const result = await PostModel.updateOne({_id: req.params.id}, postDB);
        let response: PostPutRequestResponseObject = {
            putSucceed: true,
            post: req.body.post,
            status: 200
        }
        return res.status(200).json(response);
    } catch (e) {
        let response: PostPutRequestResponseObject = {
            putSucceed: false,
            status: 505
        };
        console.log(e);
        return res.status(505).json(response);
    }
});

export default router;