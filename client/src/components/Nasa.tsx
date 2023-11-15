import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Nasa.css";
import RoverData from "../interfaces/Roverdata";

const Nasa: React.FC = () => {
  const [data, setData] = useState<RoverData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredItems, setFilteredItems] = useState<RoverData[]>([]);

  const getDataFromServer = async (page: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get<RoverData[]>(
        `http://localhost:4000/nasa?page=${page}`
      );
      const transformedData = data.map((item) => ({
        id: item.id,
        img_src: item.img_src,
        camera: { name: item.camera.name },
        rover: { cameras: item.rover.cameras },
      }));
      setData((prevData) => [...prevData, ...transformedData]);
      setLoading(false);
    } catch (error) {
      console.error(`error fetching data in get request ${error}`);
    }
  };

  useEffect(() => {
    getDataFromServer(currentPage);
  }, [currentPage]);

  const loadMoreHandler = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    // getDataFromServer(currentPage + 1);
  };

  const inputFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const seachInputClickHandler = () => {
    const filteredData = data.filter((item) => {
      return item.camera.name.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredItems(filteredData);
  };

  return (
    <div>
      <div className="main-container">
        <section>
          <h2>Seach Photos By Camera Names</h2>
          <input
            type="text"
            placeholder="search by camera name"
            value={filter}
            onChange={inputFieldHandler}
          ></input>
          <button onClick={seachInputClickHandler}>Search</button>
          <div className="filter-container">
            {filteredItems.map(({ id, camera, img_src, rover }) => (
              <div key={id}>
                <h3>{camera.name}</h3>
                <img className="box" src={img_src} alt="hey" />
              </div>
            ))}
          </div>
        </section>
        {data.map(({ id, camera, img_src, rover }) => (
          <li key={id} className="container">
            <h3>{camera.name}</h3>
            <img className="box" src={img_src} alt="hey" />
            {rover.cameras.map(({ name, full_name }) => (
              <li key={name}>{full_name}</li>
            ))}
          </li>
        ))}
        <section>
          <button onClick={loadMoreHandler} disabled={loading}>
            {loading ? "Loading" : "Load More"}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Nasa;
