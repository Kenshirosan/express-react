import React, { useEffect, useState } from 'react';
import Aside from './Aside';
import Hero from './Hero';
import SubHero from './SubHero';
import ShowArticle from './ShowArticle';

import {
    featured,
    mainTitle,
    blogTitle,
    postOfTheDayExcerpt,
} from '../../../data/data';
import { fetchData } from '../../../../utilities';

// Karim : Oui pour setArticles
// Moi : NON

const Main = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchData('/api/articles').then(data => setArticles(data.articles));
    }, []);

    return (
        <main className="container">
            <Hero title={blogTitle} excerpt={postOfTheDayExcerpt} />

            <SubHero featured={featured} />

            <div className="row g-5">
                <div className="col-md-8">
                    <h3 className="pb-4 mb-4 fst-italic border-bottom">
                        {mainTitle}
                    </h3>

                    {articles.map(article => (
                        <ShowArticle key={article._id} article={article} />
                    ))}
                </div>
                <Aside />
            </div>
        </main>
    );
};

export default Main;
