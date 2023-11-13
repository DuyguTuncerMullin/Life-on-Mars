import React, { useState, useEffect } from "react";
import axios from "axios";
import RoverData from "../interfaces/Roverdata";

import "./Nasa.css";

const Nasa: React.FC = () => {
  const [data, setData] = useState<RoverData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);

      const { data: responseData } = await axios.get<RoverData[]>(
        `http://localhost:4000/nasa?page=${page}`
      );

      const transformedData = responseData.map((item) => ({
        id: item.id,
        img_src: item.img_src,
        camera: { name: item.camera.name },
      }));

      setData((prevData) => [...prevData, ...transformedData]);
    } catch (error) {
      console.error("Error fetching data from server:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchData(currentPage + 1);
  };

  return (
    <div>
      <div className="main-container">
        <div>
          {data.map(({ id, camera, img_src }) => (
            <ul key={id} className="container">
              <h4>Camera name: {camera.name}</h4>
              <img className="box" src={img_src} alt={`Mars Rover - ${id}`} />
            </ul>
          ))}
        </div>
        <button onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More Photos"}
        </button>
      </div>
    </div>
  );
};

export default Nasa;
