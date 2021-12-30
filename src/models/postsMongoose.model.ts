import { Schema, model, Types } from "mongoose";
import { Post } from "./post.model";

export interface PostDBType {
    author: string,
    profile_pic?: string,
    post_img?: string,
    post_description?: string,
    title?: string,
    _id: Types.ObjectId
}

const postSchema = new Schema<PostDBType>({
    author: {type: String, required: true},
    profile_pic: String,
    post_img: String,
    post_description: String,
    title: String
});

export const PostModel = model<PostDBType>('Post', postSchema);