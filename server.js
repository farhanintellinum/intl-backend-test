import express from "express";
import Router from "./src/routes/index.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(Router);
app.use(express.static("public"));

app.post("/example", (req, res) => {
  console.log(req.body, "cek data");
  res.json(req.body);
});
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
