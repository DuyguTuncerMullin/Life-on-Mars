import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Nasa.css";

const Nasa = () => {
  const [nasaData, setNasaData] = useState<
    { earth_date: string; id: number; img_src: string }[]
  >([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:4000/nasa");
      console.log("response.data", data);
      setNasaData(data);
    };
    fetchData();
  }, []);

  const searchPhotosByDate = async () => {
    const response = await axios.post("http://localhost:4000/nasa", { query });
    console.log("query", query);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="search images by date"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        ></input>
        <button onClick={searchPhotosByDate}>Searh</button>
      </div>
      <div>
        {nasaData.map(({ id, earth_date, img_src }) => (
          <div key={id}>
            <li>{earth_date}</li>
            <img className="box" src={img_src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nasa;
