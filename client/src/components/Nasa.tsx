import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Nasa.css";
import RoverData from "../interfaces/Roverdata";

const Nasa: React.FC = () => {
  const [data, setData] = useState<RoverData[]>([]);

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const { data } = await axios.get<RoverData[]>(
          "http://localhost:4000/nasa"
        );
        console.log("data", data);
        const transformedData = data.map(item => ({
          id: item.id,
          img_src: item.img_src,
          camera: { name: item.camera.name }
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data from server:", error);
      }
    };
    getDataFromServer();
  }, []);

  return (
    <div>
      <div>
        {data.map(({ id, camera, img_src }) => (
          <ul key={id} className="container">
            <h4>Camera name: {camera.name}</h4>
            <img className="box" src={img_src} />
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Nasa;
