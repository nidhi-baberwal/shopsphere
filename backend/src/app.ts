import express from "express";

const app = express();

//Middleware
app.use(express.json());

//Test Route
app.get("/", (req, res) => {
    res.send("Welcome to ShopSphere API");
});

export default app;