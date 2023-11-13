import axios from "axios";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();

const apiConfig = {
  base: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/",
  key: process.env.API_KEY,
};

app.get("/nasa", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${apiConfig.base}photos?sol=1000&api_key=${apiConfig.key}`
    );
    res.send(data.photos);
  } catch (error) {
    console.error(`error fetching data ${error}`);
    res.send(500).json({ error: `earror fething data ${error}` });
  }
});

app.post("/nasa", async (req, res) => {
  const dataFromClient = req.body;
  console.log("dataFromClient", dataFromClient);
});

app.listen(port, () => {
  console.log(`listening server on port ${port}`);
});
