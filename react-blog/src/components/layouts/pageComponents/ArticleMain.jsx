import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ArticleMain = ({ article }) => {
    return (
        <article className="blog-post">
            <h2 className="blog-post-title">
                <Link to={`/article/${article.id}`}>{article.title}</Link>
            </h2>

            <p className="blog-post-meta">
                {article.date} by <a href="/">{article.author}</a>
            </p>

            <p>{article.body}</p>

            {/*  react null pattern*/}
            {article.list && article.list.length ? (
                <ul>
                    {article.list.map((elem, index) => (
                        <li key={index}>{elem}</li>
                    ))}
                </ul>
            ) : null}

            <p>{article.footer}</p>
        </article>
    );
};

ArticleMain.propTypes = {
    article: PropTypes.object.isRequired,
};

export default ArticleMain;
