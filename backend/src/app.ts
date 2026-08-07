import express from "express";
import authRoutes from "./routes/authRoutes";

const app = express();

//Middleware
app.use(express.json());

app.use("/api/auth", authRoutes);

//Test Route
app.get("/", (req, res) => {
    res.send("Welcome to ShopSphere API");
});

export default app;