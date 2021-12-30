"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const http_1 = __importDefault(require("http"));
const expressApp_1 = __importDefault(require("./expressApp"));
class Server {
    constructor(port) {
        this.port = (process.env.PORT || port);
        this.expressApp = expressApp_1.default;
        this.expressApp.set("port", this.port);
        this.httpServer = http_1.default.createServer(this.expressApp);
    }
    start() {
        this.httpServer.on("error", (err) => this.onError(err));
        this.httpServer.on("listening", () => this.onListening());
        this.httpServer.listen(this.port);
        // this.expressApp.use(express.json());
        // this.expressApp.use(express.urlencoded({
        //     extended: true
        // }));
        // this.expressApp.use((req, res, next)=>{
        //     const allowedOrigins = ["http://localhost:4200"];
        //     const origin = req.headers.origin;
        //     console.log(origin + " requested");
        //     if (typeof origin === "string" && allowedOrigins.includes(origin)) {
        //         res.setHeader("Access-Control-Allow-Origin", origin);
        //     }
        //     res.setHeader("Access-Control-Allow-Headers", 
        //     "Origin, X-Requested-With, Content-Type, Accept");
        //     res.setHeader(
        //         "Access-Control-Allow-Methods",
        //         "GET, POST, PATCH, DELETE, OPTIONS"
        //     );
        //     next();
        // });
        // this.expressApp.get("/test", (req,res)=>{
        //     return res.send("test successed");
        // });
        // this.expressApp.post("/api/posts", (req, res, next)=>{
        //     const postObject = req.body;
        //     console.log(postObject);
        //     return res.status(201).json({
        //         message: "post added successfully"
        //     });
        // })
        // this.expressApp.get("/api/posts", (req, res, next)=>{
        //     const posts: Post[] = [
        //         {id: "123uh3nhd3", author: "Alice", title:"Alice's first post", post_description:"alice love posts"},
        //         {id: "3jeni48hfs", author: "Steve", title:"Steve's first post", post_description:"Steve is the coolest"},
        //     ];
        //     const requestObject: PostsGetRequestResponseObject = {
        //         message:"fetch request succeeded",
        //         posts:posts,
        //         status: 200
        //     };
        //     return res.status(200).json(requestObject);
        // });
    }
    onError(error) {
        if (error.syscall !== "listen") {
            throw error;
        }
        const bind = typeof this.port === "string" ? "pipe " + this.port : "port " + this.port;
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
    onListening() {
        // const addr = this.httpServer.address();
        const bind = typeof this.port === "string" ? "pipe " + this.port : "port " + this.port;
        (0, console_1.debug)("Listening on " + bind);
    }
}
exports.default = Server;