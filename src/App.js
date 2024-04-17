import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import "./index.scss";

const categories = [{ name: "All" }, { name: "Sea" }, { name: "Mountains" }, { name: "Architecture" }, { name: "Cities" }];

function App() {
  const [searchValue, setSeacrhValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  useEffect(() => {
    fetch(`https://661e9e3716358961cd92650a.mockapi.io/photo-collections?${selectedCategoryId ? `category=${selectedCategoryId}` : ""}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to load data");
      });
  }, [selectedCategoryId]);

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((cat, i) => (
            <li
              onClick={() => {
                setSelectedCategoryId(i);
              }}
              className={selectedCategoryId === i ? "active" : ""}
              key={cat.name}
            >
              {cat.name}
            </li>
          ))}
        </ul>
        <input onChange={(e) => setSeacrhValue(e.target.value)} value={searchValue} className="search-input" placeholder="Search by name" />
      </div>
      <div className="content">
        {collections
          .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map((col, index) => (
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
