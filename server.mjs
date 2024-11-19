import express from "express";
import router from "./routes/record.mjs";
import cors from "cors";

const PORT = 5000;
const app = express();

// Middleware : They are the functions that excute in order before the controller
app.use(cors());
app.use(express.json()); //express.json() is used to pass the request in the form of object 

app.use("/records", router);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
