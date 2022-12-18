import { deleteArticle, editArticle } from "../services/articleService";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function Article({
  article,
  setArticle,
  articles,
  setArticles,
  updateReceived,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [body, setBody] = useState("");

  useEffect(() => {
    if (article) {
      setBody(article.body);
    }
  }, [article]);

  async function handleDelete(id) {
    try {
      await deleteArticle(id);
      setArticle(null);
      updateReceived();
    } catch (error) {
      console.log("handleDelete issue: " + error);
    }
  }

  async function handleEditSubmit(e) {
    console.log(e);
    e.preventDefault();
    try {
      await editArticle({
        body: body,
        date: article.date,
        id: article.id,
        title: article.title,
      });
      setShowEdit(false);
      updateReceived();
      console.log("It worked!");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : article && !showEdit ? (
        <section>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${dayjs(Date(article.date)).format(
            "DD/MM/YYYY"
          )}`}</p>
          <p className="body">{article.body}</p>
          <button onClick={() => handleDelete(article.id)} className="button">
            Delete
          </button>
          <button onClick={() => setShowEdit(!showEdit)} className="button">
            {!showEdit ? "edit" : "cancel"}
          </button>
        </section>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${dayjs(Date(article.date)).format(
            "DD/MM/YYYY"
          )}`}</p>
          {/* <input value={body} onChange={(e) => setBody(e.target.value)} /> */}
          <textarea
            rows="8"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></textarea>
          <button type="submit">Submit Edit</button>
        </form>
      )}
    </article>
  );
}
