import { connect } from "mongoose";
import { PostModel, PostDBType } from "../models/postsMongoose.model";
import { Post } from "../models/post.model";

export default class DataBase {
    private pass: string = "mUxv7MrudLc8RaT";
    private userName: string = "Steve";
    private connection_URL: string;

    constructor() {
        this.connection_URL = `mongodb+srv://${this.userName}:${this.pass}@cluster0.y6moq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    }

    async connectDB() {
        try {
            const db = await connect(this.connection_URL);
            console.log("Successfully connected to database");
        } 
        catch {
            console.log("Fail to connect to Database");
        }  
    }

    public static postDB2Client(postDB: PostDBType): Post {
        const copy:PostDBType = JSON.parse(JSON.stringify(postDB));

        let result: any = copy;

        result.id = copy._id.toString();

        delete result["__v"];
        delete result["_id"];
        let postResult: Post = result;
        return postResult;
    }
}