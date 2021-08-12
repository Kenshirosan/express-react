import PropTypes from 'prop-types';
import Featured from './Featured';

const SubHero = ({ featured }) => {
    return (
        <div className="row mb-2">
            {featured.map(article => (
                <Featured
                    key={article.id}
                    article={article}
                    className={
                        article.color && article.color.length
                            ? article.color
                            : 'text-primary'
                    }
                />
            ))}
        </div>
    );
};

SubHero.propTypes = {
    featured: PropTypes.array.isRequired,
};

export default SubHero;
