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
    const { page = 1 } = req.query;
    const perPage = 5; 
    const { data } = await axios.get(
      `${apiConfig.base}photos?sol=1000&api_key=${apiConfig.key}&page=${page}&per_page=${perPage}`
    );
    res.send(data.photos);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
