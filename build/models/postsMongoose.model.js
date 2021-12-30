"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    author: { type: String, required: true },
    profile_pic: String,
    post_img: String,
    post_description: String,
    title: String
});
exports.PostModel = (0, mongoose_1.model)('Post', postSchema);
