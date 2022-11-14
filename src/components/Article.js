import { deleteArticle } from "../services/articleService";

export default function Article({
  article,
  setArticle,
  articles,
  setArticles,
}) {
  function handleDelete(id) {
    deleteArticle(id);
    setArticle(null);
    let index = articles.findIndex((article) => article.id == id);
    articles.splice(index, 1);
    setArticles([...articles]);
  }

  

  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
          <p className="date">{`Posted: ${article.date}`}</p>
          <p className="body">{article.body}</p>
          <button onClick={() => handleDelete(article.id)}>Delete</button>
          <button>edit</button>
        </section>
      )}
    </article>
  );
}
