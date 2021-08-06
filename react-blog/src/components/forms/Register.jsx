import { useState } from 'react';
import Notification from '../layouts/pageComponents/Notification';
import LinkBack from '../layouts/pageComponents/LinkBack';
import { validateEmail, fetchData } from '../../utilities';

const Register = () => {
    // Un State pour le formulaire.
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    });

    // Pour notifications
    const [notify, setNotify] = useState(false);
    const [message, setMessage] = useState('');
    const [level, setLevel] = useState('alert-success');

    // Récupérer les données des inputs
    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Créer un objet contact et l'enregistrer dans localStorage.
    const onSubmitHandler = async e => {
        e.preventDefault();

        const { email, password, password2 } = formData;

        // Validation
        // Vérifier que les mots de passe sont les mêmes
        // Vérifier que l'email est un email
        if (password2 !== password || !validateEmail(email)) {
            return maybeNotify('Formulaire invalide', 'alert-danger');
        }

        const data = await fetchData('/api/users/register', formData, 'POST');

        if (data.msg) {
            setMessage(data.msg);
            return maybeNotify(data.msg, 'alert-success');
        }

        return maybeNotify(data, 'alert-danger');
    };

    const maybeNotify = (mess, level, timeout = 5000) => {
        setNotify(true);
        setMessage(mess);
        setLevel(level);
        setTimeout(() => {
            setNotify(false);
            setMessage('');
        }, timeout);
    };

    return (
        <article className="container mt-5">
            <Notification message={message} visible={notify} level={level} />

            <h2 className="text-center text-primary">Register Form</h2>
            <form className="row g-3 mb-5" onSubmit={onSubmitHandler}>
                <div className="col-md-8">
                    <label htmlFor="inputEmail4" className="form-label">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="inputEmail4"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="col-md-8">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="col-md-8">
                    <label htmlFor="password2" className="form-label">
                        Password Confirmation
                    </label>
                    <input
                        name="password2"
                        type="password"
                        className="form-control"
                        id="password2"
                        onChange={onChangeHandler}
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Sign in
                    </button>
                </div>
            </form>
            <LinkBack />
        </article>
    );
};

export default Register;
