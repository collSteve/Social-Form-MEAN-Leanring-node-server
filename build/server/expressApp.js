"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = __importDefault(require("./routes/posts"));
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
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
expressApp.get("/test", (req, res) => {
    return res.send("test successed");
});
expressApp.use("/api/posts", posts_1.default);
exports.default = expressApp;
