import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function SingleItem() {
  let { id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/articles/byId/${id}`).then((response) => {
      setArticle(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });

    axios
      .get("http://localhost:3001/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          body: newComment,
          ArticleId: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const toAdd = { body: newComment };
          setComments([...comments, toAdd]);
          setNewComment("");
        }
      });
  };
  return (
    <div className="outer">
      <div className="card">
        <div className="inner">
          <h1 className="title">{article.title}</h1>
        </div>
        <div className="inner">
          <p className="body">{article.body}</p>
        </div>
        <div className="inner">
          <p className="date">{article.createdAt}</p>
        </div>
        <div className="inner">
          <p className="date">{article.updatedAt}</p>
        </div>
      </div>
      {authState && (
        <>
          <div className="card">
            <div className="inner">
              <textarea
                className="commentBox"
                placeholder="Write your comment"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              />
              <div className="inner">
                <button onClick={addComment}>Add</button>
              </div>
            </div>
          </div>
        </>
      )}

      {comments.map((value, key) => {
        return (
          <div className="commentcard">
            <p>{value.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SingleItem;
