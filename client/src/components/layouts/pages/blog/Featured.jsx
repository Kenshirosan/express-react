import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Featured = ({ article, className }) => {
  return (
    <article className="col-md-6">
      <div
        className="
              row
              g-0
              border
              rounded
              overflow-hidden
              flex-md-row
              mb-4
              shadow-sm
              h-md-250
              position-relative
            "
      >
        <div className="col p-4 d-flex flex-column position-static">
          <strong className={`d-inline-block mb-2 ${className}`}>
            {article.category}
          </strong>
          <h3 className="mb-0">{article.title}</h3>
          <div className="mb-1 text-muted">{article.date}</div>
          <p className="card-text mb-auto">{article.excerpt}</p>
          <Link to={`featured/${article.id}`} className="stretched-link">
            {article.link}
          </Link>
        </div>
        <div className="col-auto d-none d-lg-block">
          <svg
            className="bd-placeholder-img"
            width="200"
            height="250"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c" />
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">
              Thumbnail
            </text>
          </svg>
        </div>
      </div>
    </article>
  );
};

Featured.defaultProps = {
  className: "text-primary",
};

Featured.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Featured;
