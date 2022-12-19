import { useEffect, useState } from "react";
import Nav from "./Nav";
import Article from "./Article";
import ArticleEntry from "./ArticleEntry";
import { SignIn, SignOut, useAuthentication } from "../services/authService";
import { fetchArticles, createArticle } from "../services/articleService";
import "./App.css";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [writing, setWriting] = useState(false);
  const user = useAuthentication();
  const [updates, setUpdates] = useState(0);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");

  // This is a trivial app, so just fetch all the articles only when
  // a user logs in. A real app would do pagination. Note that
  // "fetchArticles" is what gets the articles from the service and
  // then "setArticles" writes them into the React state.

  useEffect(() => {
    if (user) {
      fetchArticles().then((data) => {
        setArticles(data);
      });
    }
  }, [user, updates]);

  function updateReceived() {
    setUpdates(updates + 1);
  }

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body }) {
    createArticle({ title, body }).then((article) => {
      setArticle(article);
      setArticles([article, ...articles]);
      setWriting(false);
    });
  }

  return (
    <div className="App">
      <header>
        Blog
        {user && (
          <button onClick={() => setWriting(!writing)}>
            {!writing ? "New Article" : "Cancel"}
          </button>
        )}
        {!user ? <SignIn /> : <SignOut />}
      </header>
      {!user ? (
        ""
      ) : (
        <Nav
          articles={articles}
          setArticle={setArticle}
          updateReceived={updateReceived}
          setBody={setBody}
          setTitle={setTitle}
        />
      )}
      {!user ? (
        ""
      ) : writing ? (
        <ArticleEntry addArticle={addArticle} />
      ) : (
        <Article
          article={article}
          setArticle={setArticle}
          articles={articles}
          setArticles={setArticles}
          updateReceived={updateReceived}
          body={body}
          setBody={setBody}
          title={title}
        />
      )}
    </div>
  );
}
