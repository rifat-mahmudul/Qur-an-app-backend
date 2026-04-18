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
const app_1 = __importDefault(require("./app"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = 5000;
let server;
const mongodbURI = "mongodb+srv://testDB:5ACXqs4CpcecmfgM@cluster0.jpopwep.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new mongodb_1.MongoClient(mongodbURI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        yield client.db("admin").command({ ping: 1 });
        console.log("✅ Connected to MongoDB");
        server = app_1.default.listen(port, () => {
            console.log(`🚀 Server is running on port: ${port}`);
        });
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB", error);
        process.exit(1);
    }
});
bootstrap();
