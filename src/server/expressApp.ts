import express, {Express} from "express";
import path from "path";

import router from "./routes/posts";
import DataBase from "../DB/db";

const db_obj: DataBase = new DataBase();
db_obj.connectDB();

const expressApp:Express = express();

expressApp.use(express.json());
expressApp.use(express.urlencoded({
    extended: true
}));

const public_folder_path = path.join(__dirname, '../../public');
expressApp.use(express.static(public_folder_path));

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
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

expressApp.get("/test", (req,res)=>{
    return res.send("test successed");
});

expressApp.use("/api/posts", router)

expressApp.get('/*',  function(req, res, next) {
    res.sendFile('index.html', { root: public_folder_path }); 
});

export default expressApp;