import { deleteArticle } from "../services/articleService";
import { useState } from "react";

export default function Article({
  article,
  setArticle,
  articles,
  setArticles,
  updateReceived,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [body, setBody] = useState(article?.body);

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
  }

  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : article && !showEdit ? (
        <section>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${article.date}`}</p>
          <p className="body">{article.body}</p>
          <button onClick={() => handleDelete(article.id)}>Delete</button>
          <button onClick={() => setShowEdit(!showEdit)}>
            {!showEdit ? "edit" : "cancel"}
          </button>
        </section>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${article.date}`}</p>
          <input value={body} onChange={(e) => setBody(e.target.value)} />

          {/* <textarea
            rows="8"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea> */}

          <button type="submit">Submit Edit</button>
        </form>
      )}
    </article>
  );
}
