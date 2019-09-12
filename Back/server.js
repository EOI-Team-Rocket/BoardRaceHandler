const express = require("express");
const cors = require("cors");
const v1Router = require("./api/v1/routes");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const corsOptions = {
    origin: "http://localhost:8080"
}

mongoose.connect("mongodb://localhost:27017/events", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1", v1Router);

app.listen(port, function(){
    console.log("Server listening on port: " + port);
});