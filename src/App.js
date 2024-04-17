import React, { useEffect, useState } from "react";
import { Collection } from "./Collection";
import "./index.scss";

const categories = [{ name: "All" }, { name: "Sea" }, { name: "Mountains" }, { name: "Architecture" }, { name: "Cities" }];

function App() {
  const [searchValue, setSeacrhValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = selectedCategoryId ? `category=${selectedCategoryId}` : "";
    const pageParam = `page=${page}`;

    fetch(`https://661e9e3716358961cd92650a.mockapi.io/photo-collections?${category}&page=${page}&limit=3`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Failed to load data");
      })
      .finally(() => setIsLoading(false));
  }, [selectedCategoryId, page]);

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
        {isLoading ? (
          <h2>Loading</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((col, index) => <Collection key={index} name={col.name} images={col.photos} />)
        )}
      </div>
      <ul className="pagination">
        {
          // Let's create fake pages on user side
          [...Array(3)].map((_, i) => (
            <li className={page === i + 1 ? "active" : ""} onClick={() => setPage(i + 1)} key={i}>
              {i + 1}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
