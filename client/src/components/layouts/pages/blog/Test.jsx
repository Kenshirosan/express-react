import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../../utilities';

const Test = () => {
    const [html, setHtml] = useState('');

    useEffect(() => {
        fetchData('/api/test').then(data => setHtml(data));
    }, []);
    return (
        <div className="container">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

export { Test };
