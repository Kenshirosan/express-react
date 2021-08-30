import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchData } from '../../../../utilities';
import DOMPurify from 'dompurify';

function Steps() {
    const [html, setHtml] = useState();
    const loc = useLocation();

    useEffect(() => {
        fetchData(`/api${loc.pathname}`).then(data => {
            setHtml(data);
        });
    }, []);

    return (
        <div className="container">
            <Link to="/steps">Back</Link>
            <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
            />
        </div>
    );
}

export default Steps;
