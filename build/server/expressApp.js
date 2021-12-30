"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postsMongoose_model_1 = require("../models/postsMongoose.model");
const db_1 = __importDefault(require("../DB/db"));
const db_obj = new db_1.default();
db_obj.connectDB();
const expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json());
expressApp.use(express_1.default.urlencoded({
    extended: true
}));
expressApp.use((req, res, next) => {
    const allowedOrigins = ["http://localhost:4200"];
    const origin = req.headers.origin;
    console.log(origin + " requested");
    if (typeof origin === "string" && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
expressApp.get("/test", (req, res) => {
    return res.send("test successed");
});
expressApp.post("/api/posts", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postObject = req.body;
    const newPost = postObject.post;
    const newPostDB = new postsMongoose_model_1.PostModel(newPost);
    try {
        const savedPostDB = yield newPostDB.save();
        const postRequestResponse = {
            status: 201,
            message: "[Server] Post added succussfully!",
            addedPostSuccessful: true,
            post_id: savedPostDB._id.toString()
        };
        return res.status(201).json(postRequestResponse);
    }
    catch (_a) {
        const postRequestResponse = {
            addedPostSuccessful: false,
            status: 500,
            message: "[Server] Fail to add Post!"
        };
        return res.status(500).json(postRequestResponse);
    }
}));
expressApp.get("/api/posts", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield postsMongoose_model_1.PostModel.find();
    const fetchedPosts = [];
    doc.forEach((postDB) => {
        fetchedPosts.push(db_1.default.postDB2Client(postDB));
    });
    const requestObject = {
        message: "fetch request succeeded",
        posts: fetchedPosts,
        status: 200
    };
    return res.status(200).json(requestObject);
}));
expressApp.delete("/api/posts/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield postsMongoose_model_1.PostModel.deleteOne({ _id: req.params.id });
    console.log(result);
    res.status(200).json({ message: "post deleted!" });
}));
exports.default = expressApp;
