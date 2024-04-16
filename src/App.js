import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import "./index.scss";

function App() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch("https://661e9e3716358961cd92650a.mockapi.io/photo-collections")
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to load data");
      });
  }, []);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          <li className="active">All</li>
          <li>Mountains</li>
          <li>Sea</li>
          <li>Architecture</li>
          <li>Cities</li>
        </ul>
        <input className="search-input" placeholder="Search by name" />
      </div>
      <div className="content">
        {collections.map((col, index) => (
          <Collection key={index} name={col.name} images={col.photos} />
        ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
