import { NavLink } from 'react-router-dom';

const StepsLinks = () => {
    return (
        <div className="container">
            <NavLink className="link-primary mx-3" to="/steps/steps">
                étapes de création du blog
            </NavLink>
            <NavLink className="link-primary mx-3" to="/steps/readme">
                Le readme
            </NavLink>
            <NavLink className="link-primary mx-3" to="/steps/todo">
                le todo
            </NavLink>
            <NavLink className="link-primary mx-3" to="/steps/infos">
                Quelques infos
            </NavLink>
        </div>
    );
};

export default StepsLinks;
