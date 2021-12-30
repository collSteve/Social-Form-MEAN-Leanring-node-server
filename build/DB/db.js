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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class DataBase {
    constructor() {
        this.pass = "mUxv7MrudLc8RaT";
        this.userName = "Steve";
        this.connection_URL = `mongodb+srv://${this.userName}:${this.pass}@cluster0.y6moq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield (0, mongoose_1.connect)(this.connection_URL);
                console.log("Successfully connected to database");
            }
            catch (_a) {
                console.log("Fail to connect to Database");
            }
        });
    }
    static postDB2Client(postDB) {
        const copy = JSON.parse(JSON.stringify(postDB));
        let result = copy;
        result.id = copy._id.toString();
        delete result["__v"];
        delete result["_id"];
        let postResult = result;
        return postResult;
    }
}
exports.default = DataBase;
