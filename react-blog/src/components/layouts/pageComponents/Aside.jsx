import { archives, socialLinks, presentation } from '../../data/data';

const Aside = () => {
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
                        {/* map ici avec les données qui viennent du fichier data */}
                        {archives.map(archive => (
                            <li>
                                <a href="/">{archive}</a>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="p-4">
                    <h4 className="fst-italic">Elsewhere</h4>
                    <ol className="list-unstyled">
                        {socialLinks.map(link => (
                            <li>
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
