export default function Nav({
  articles,
  setArticle,
  updateReceived,
  setBody,
  setTitle,
}) {
  function clickedArticle(article) {
    setArticle(article);
    setTitle(article.title);
    setBody(article.body);
  }

  return (
    <nav>
      {!articles
        ? "No articles"
        : articles.map((a) => (
            <p key={a.id} onClick={() => clickedArticle(a)}>
              {a.title}
            </p>
          ))}
    </nav>
  );
}
