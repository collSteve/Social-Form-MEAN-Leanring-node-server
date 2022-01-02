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
const db_1 = __importDefault(require("../../DB/db"));
const postsMongoose_model_1 = require("../../models/postsMongoose.model");
const router = express_1.default.Router();
router.post("", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
router.get("", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield postsMongoose_model_1.PostModel.deleteOne({ _id: req.params.id });
        console.log(result);
        return res.status(200).json({ message: "post deleted!" });
    }
    catch (_b) {
        return res.status(500).json({ message: "post delete failed!" });
    }
}));
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Get single post requested");
    const result = yield postsMongoose_model_1.PostModel.findById(req.params.id);
    if (result) {
        let response = {
            post: db_1.default.postDB2Client(result),
            status: 200,
            fetchSucceed: true
        };
        // console.log("single post id: "+DataBase.postDB2Client(result).id);
        return res.status(200).json(response);
    }
    let response = {
        status: 505,
        fetchSucceed: false
    };
    return res.status(505).json(response);
}));
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const postDB = db_1.default.postClient2DBModel(req.body.post, true);
    try {
        const result = yield postsMongoose_model_1.PostModel.updateOne({ _id: req.params.id }, postDB);
        let response = {
            putSucceed: true,
            post: req.body.post,
            status: 200
        };
        return res.status(200).json(response);
    }
    catch (e) {
        let response = {
            putSucceed: false,
            status: 505
        };
        console.log(e);
        return res.status(505).json(response);
    }
}));
exports.default = router;
