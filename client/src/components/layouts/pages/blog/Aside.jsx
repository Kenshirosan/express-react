import { socialLinks, presentation } from '../../../data/data';

const Aside = ({ archiveDates }) => {
    return (
        <div className="col-md-4">
            <div className="position-sticky" style={{ top: '2rem' }}>
                <div className="p-4 mb-3 bg-light rounded">
                    <h4 className="fst-italic">About</h4>
                    <p className="mb-0">{presentation}</p>
                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Archives</h4>
                    <ol className="list-unstyled mb-0">
                        {/* */}
                        {/* map ici avec les données qui venaient du fichier data, qui viennent maintenant de mongoDB */}
                        {archiveDates &&
                            archiveDates.map((date, index) => (
                                <li key={index}>
                                    <a href="/">{date._id}</a>
                                </li>
                            ))}
                    </ol>
                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Elsewhere</h4>
                    <ol className="list-unstyled">
                        {socialLinks.map((link, index) => (
                            <li key={index}>
                                <a href="/">{link}</a>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Aside;
