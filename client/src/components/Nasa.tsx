import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import RoverData from "../interfaces/Roverdata";

import "./Nasa.css";

const Nasa: React.FC = () => {
  const [data, setData] = useState<RoverData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<RoverData[]>([]);

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
        rover: { cameras: item.rover.cameras },
      }));

      setData((prevData) => [...prevData, ...transformedData]);

      // if (filter) {
      //   const filteredResults = transformedData.filter((item) =>
      //     item.camera.name.toLowerCase().includes(filter.toLowerCase())
      //   );
      //   setFilteredData((prevFilteredData) => [
      //     ...prevFilteredData,
      //     ...filteredResults,
      //   ]);
      // }
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

  const inputFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filterClickHandler = () => {
    const filteredResults = data.filter((item) =>
      item.camera.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filteredResults);
    setFilter("");
  };

  return (
    <div>
      <div className="main-container">
        <section>
          <input
            type="text"
            placeholder="find your rover photo by camera name"
            value={filter}
            onChange={inputFieldHandler}
          ></input>
          <button onClick={filterClickHandler}>Seach</button>
        </section>
        <div>
          {filteredData.map(({ id, camera, img_src, rover }) => (
            <ul key={id} className="container">
              <h4>Camera name: {camera.name}</h4>
              <img className="box" src={img_src} alt={`Mars Rover - ${id}`} />
              <div>
                <h5>Cameras:</h5>
                <ul>
                  {rover.cameras.map((camera) => (
                    <li key={camera.name}>{camera.full_name}</li>
                  ))}
                </ul>
              </div>
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
