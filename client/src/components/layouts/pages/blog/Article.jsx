import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkBack from '../../common/LinkBack';
import { fetchData } from '../../../../utilities';
import DOMPurify from 'dompurify';

const Article = () => {
    const [article, setArticle] = useState({});
    const { id } = useParams(); // Extraire id de l'URL

    useEffect(() => {
        fetchData(`/api/articles/${id}`).then(res => {
            setArticle(res.article);
        });
    }, [id]);

    return (
        <Fragment>
            {article && article._id ? (
                <article className="container blog-post mt-5 mb-5">
                    <h2 className="blog-post-title">{article.title}</h2>
                    <p className="blog-post-meta">
                        {new Date(article.createdAt).toLocaleDateString()}{' '}
                        <a href="!#">{article.userId.name}</a> Catégorie :{' '}
                        <a href="!#">{article.categoryId?.name}</a>
                    </p>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(article.body),
                        }}
                    />

                    <LinkBack />
                </article>
            ) : null}
        </Fragment>
    );
};

export default Article;
