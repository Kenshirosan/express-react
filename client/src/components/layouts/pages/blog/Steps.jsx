import React, { useEffect, useState } from 'react';
import { fetchData } from '../../../../utilities';
import DOMPurify from 'dompurify';

function Steps() {
    const [html, setHtml] = useState();

    useEffect(() => {
        fetchData('/api/steps').then(data => {
            setHtml(data);
        });
    });

    return (
        <div className="container">
            <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
            />
        </div>
    );
}

export default Steps;
