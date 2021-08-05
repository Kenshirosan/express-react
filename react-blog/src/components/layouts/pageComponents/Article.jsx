import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LinkBack from "./LinkBack";

const Article = () => {
  const [article, setArticle] = useState({});
  const { id } = useParams(); // Extraire id de l'URL

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Une Erreur");
      })
      .then((article) => setArticle(article))
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <Fragment>
      {article && article.id ? (
        <article className="container blog-post mt-5 mb-5">
          <h2 className="blog-post-title">{article.title}</h2>
          <p className="blog-post-meta">
            December 23, 2020 by <a href="#">{article.userId}</a>
          </p>

          <p>{article.body}</p>

          <p>
            This is some additional paragraph placeholder content. It's a
            slightly shorter version of the other highly repetitive body text
            used throughout.
          </p>
          <LinkBack />
        </article>
      ) : null}
      ;
    </Fragment>
  );
};

export default Article;
