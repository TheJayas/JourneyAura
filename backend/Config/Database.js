import mongoose from "mongoose";

const connectDatabase = ()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/Irctc",{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`MongoDb connected with server ${data.connection.host}`);
    })//.catch((err)=>{
    //     console.log(err);
    // })
}

export default connectDatabase;