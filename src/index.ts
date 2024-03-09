import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// routes
import userRoutes from "./routes/users";

const app = express();

app.use(
  //define cross origin website
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 5000;

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
