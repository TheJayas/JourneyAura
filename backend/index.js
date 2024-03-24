import app from "./app";
import dotenv from "dotenv";
import connectDatabase from "./Config/Database";

//Handling uncaught Exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught Exception");
    process.exit(1);
});

//Config

dotenv.config({path:"backend/Config/config.env"});

//Connecting database

connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on ${process.env.PORT}`);
});

//Unhandled Promise Rejection

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to handled promise rejection");

    server.close(()=>{
        process.exit(1);
    });
});