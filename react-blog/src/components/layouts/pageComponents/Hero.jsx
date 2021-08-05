import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Hero = ({ title, excerpt }) => {
    return (
        <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
            <div className="col-md-6 px-0">
                <h1 className="display-4 fst-italic">{title}</h1>
                <p className="lead my-3">{excerpt}</p>
                <p className="lead mb-0">
                    <Link to={`/article/2`} className="text-white fw-bold">
                        Continue reading...
                    </Link>
                </p>
            </div>
        </div>
    );
};

Hero.defaultProps = {
    title: 'Title of a longer featured blog post default props',
};

Hero.propTypes = {
    title: PropTypes.string,
    excerpt: PropTypes.string.isRequired,
};

export default Hero;
