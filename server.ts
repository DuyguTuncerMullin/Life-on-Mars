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
  base: process.env.API_BASE,
  key: process.env.API_KEY,
};

app.get("/nasa", async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const perPage = 5;
    // console.log("page", page)
    const { data } = await axios.get(
      `${apiConfig.base}photos?sol=1000&api_key=${apiConfig.key}&per_page=${perPage}&page=${page}`
    );
    res.send(data.photos);
  } catch (error) {
    console.error(`error in /nasa route in get request ${error}`);
    res
      .status(500)
      .json({ error: `error in /nasa route in get request ${error}` });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
