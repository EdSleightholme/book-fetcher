import React, { useState } from "react";
import "./App.css";

import { BookData, fetchBooks } from "./endpoints";

function App() {
  const [booksData, setBooksData] = useState<BookData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [fetchingData, setFetchingData] = useState<boolean>(false);

  const getBookData = async () => {
    setFetchingData(true);
    const newBookData = await fetchBooks(searchTerm);
    setBooksData(newBookData);
    setFetchingData(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Search</h1>
        <input
          type="text"
          onChange={(newValue) => setSearchTerm(newValue.currentTarget.value)}
        />
        <button
          onClick={() => {
            getBookData();
          }}
        >
          DO SEARCH
        </button>
      </header>

      {fetchingData ? (
        <p>loading....</p>
      ) : booksData.length === 0 ? (
        <p>No Books To Display</p>
      ) : (
        <div className="TableWrapper">
          <div style={{ display: "table" }}>
            <div style={{ display: "table-row" }}>
              <div className={"TableHeaderCell"}>Title</div>
              <div className={"TableHeaderCell"}>Author Name</div>
              <div className={"TableHeaderCell"}>Published Year</div>
              <div className={"TableHeaderCell"}>Number Of Pages</div>
            </div>
            {booksData.map((bookData) => (
              <div
                style={{
                  display: "table-row",
                }}
              >
                <div style={{ display: "table-cell" }}>{bookData.title}</div>
                <div style={{ display: "table-cell" }}>
                  {bookData.authorName}
                </div>
                <div style={{ display: "table-cell" }}>
                  {bookData.publishedYear}
                </div>
                <div style={{ display: "table-cell" }}>
                  {bookData.numberOfPages}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
