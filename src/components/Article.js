import { deleteArticle, editArticle } from "../services/articleService";
import { useState } from "react";
import dayjs from "dayjs";

export default function Article({
  article,
  setArticle,
  articles,
  setArticles,
  body,
  setBody,
  updateReceived,
  title,
}) {
  const [showEdit, setShowEdit] = useState(false);

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
    e.preventDefault();
    setShowEdit(!showEdit);
    try {
      await editArticle({ article, body });
      setArticle(null);
      updateReceived();
    } catch (error) {
      console.log("handleEdit issue: " + error);
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
          <button onClick={() => handleDelete(article.id)}>Delete</button>
          <button onClick={() => setShowEdit(!showEdit)}>
            {!showEdit ? "edit" : "cancel"}
          </button>
        </section>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${dayjs(Date(article.date)).format(
            "DD/MM/YYYY"
          )}`}</p>
          <input value={body} onChange={(e) => setBody(e.target.value)} />
          <button type="submit">Submit Edit</button>
        </form>
      )}
    </article>
  );
}
