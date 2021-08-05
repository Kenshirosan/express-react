import React, { useState } from 'react';
import Notification from '../layouts/pageComponents/Notification';
import LinkBack from '../layouts/pageComponents/LinkBack';
import { validateEmail } from '../utilities';

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

    const onSubmitHandler = e => {
        e.preventDefault();

        const { email } = formData;

        // Validation
        // Vérifier que les mots de passe sont les mêmes
        // Vérifier que l'email est un email
        if (!validateEmail(email)) {
            return maybeNotify('Formulaire invalide', 'alert-danger');
        }

        // enregistrer formData dans localStorage.
        // Envoie sur le serveur
        //
        localStorage.setItem('contact', JSON.stringify(formData));

        fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.err) {
                    // throw : Envoie une exception : coupe l'exécution du code
                    throw new Error(data.err);
                }

                setMessage(data.msg);
            })
            .catch(err => {
                // On remet la string dans un tableau
                let message = err.message.split(',');

                message = message.join('<br>');

                maybeNotify(message, 'alert-danger', 10000);
            });

        e.target.reset();

        // Quand le contact est enregistré : afficher une notification.
        maybeNotify('Votre compte a été créé !', 'alert-success');
    };

    const maybeNotify = (mess, level) => {
        setNotify(true);
        setMessage(mess);
        setLevel(level);
        setTimeout(() => {
            setNotify(false);
            setMessage('');
        }, 5000);
    };

    return (
        <article className="container mt-5">
            {/**/}
            <Notification message={message} visible={notify} level={level} />

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
            <LinkBack />
        </article>
    );
};

export default Login;
