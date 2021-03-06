import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
const ShowArticle = ({ article }) => {
    return (
        <article className="blog-post">
            <h2 className="blog-post-title">
                <Link to={`/article/${article._id}`}>{article.title}</Link>
            </h2>

            <p className="blog-post-meta">
                Le {new Date(article.createdAt).toLocaleDateString()} par{' '}
                <a href="/">{article.userId?.name}</a>
            </p>

            <div
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(article.body),
                }}
            />
        </article>
    );
};

ShowArticle.propTypes = {
    article: PropTypes.object.isRequired,
};

export default ShowArticle;
