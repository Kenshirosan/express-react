import React, { Fragment, useState } from 'react';
import Notification from '../layouts/pageComponents/Notification';
import LinkBack from '../layouts/pageComponents/LinkBack';
import { validateEmail, fetchData } from '../../utilities';

const Login = () => {
    // Un State pour le formulaire.
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // Pour notifications
    const [notify, setNotify] = useState(false);
    const [message, setMessage] = useState('');
    const [level, setLevel] = useState('alert-success');
    // Récupérer les données des inputs
    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async e => {
        e.preventDefault();

        const { email } = formData;

        // Validation
        // Vérifier que les mots de passe sont les mêmes
        // Vérifier que l'email est un email
        if (!validateEmail(email)) {
            return maybeNotify('Formulaire invalide', 'alert-danger');
        }

        // Envoie sur le serveur

        const data = await fetchData('/api/users/login', formData, 'POST');

        if (data.msg) {
            setMessage(data.msg);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirection avec timeOut : pas idéal
            setTimeout(function () {
                window.location = '/';
            }, 3000);

            return maybeNotify(data.msg, 'alert-success');
        }

        return maybeNotify(data, 'alert-danger');
    };

    function maybeNotify(mess, level, timeout = 5000) {
        setNotify(true);
        setMessage(mess);
        setLevel(level);
        setTimeout(() => {
            setNotify(false);
            setMessage('');
        }, timeout);
    }

    return (
        <article className="container mt-5">
            {/**/}
            <Notification message={message} visible={notify} level={level} />

            {localStorage.getItem('user') === null ? (
                <Fragment>
                    <h2 className="text-center text-primary">Login Form</h2>
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

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                Sign in
                            </button>
                        </div>
                    </form>
                </Fragment>
            ) : (
                <div className="alert alert-warning">
                    {/* Changer le message pour prendre en compte quand on vient de faire un login avec succès */}
                    <p>Vous êtes déjà authentifié</p>
                </div>
            )}
            <LinkBack />
        </article>
    );
};

export default Login;
