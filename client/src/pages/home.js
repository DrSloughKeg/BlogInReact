import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfArticles, setListOfArticles] = useState([]);

  let navi = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/articles").then((response) => {
      setListOfArticles(response.data); //handle errors
    });
  }, []);

  return (
    <div className="outer">
      {listOfArticles.map((value, key) => {
        return (
          <div
            className="card"
            onClick={() => {
              navi(`/articles/byId/${value.id}`);
            }}
          >
            <div className="inner">
              <h2 className="title">{value.title}</h2>
            </div>
            <div className="inner">
              <p className="body">
                {value.body.length >= 400
                  ? value.body.substring(0, 400) + "..."
                  : value.body}
              </p>
            </div>
            <div className="inner">
              <p className="date">Created: {value.createdAt}</p>
            </div>
            <div className="inner">
              <p className="date">Last Update:{value.updatedAt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
