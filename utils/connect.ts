import mongoose from "mongoose";
import config from "config";

async function connect(){
    const dbUri = config.get<string>("dbUri")

    try{
        await mongoose.connect(dbUri)
        console.log("Connected to database")
    } catch (err) {
        console.log("could not connect to database")
        process.exit(1);
    }
}

export default connect;