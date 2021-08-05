import React, { useState } from 'react';
import Notification from '../layouts/pageComponents/Notification';
import LinkBack from '../layouts/pageComponents/LinkBack';
import { validateEmail } from '../utilities';

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
    const onSubmitHandler = e => {
        e.preventDefault();

        const { email, password, password2 } = formData;

        // Validation
        // Vérifier que les mots de passe sont les mêmes
        // Vérifier que l'email est un email
        if (password2 !== password || !validateEmail(email)) {
            return maybeNotify('Formulaire invalide', 'alert-danger');
        }

        localStorage.setItem('contact', JSON.stringify(formData));

        fetch('/api/users/register', {
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

        // Quand le contact est enregistré : afficher une notification.
        maybeNotify(message, 'alert-success');
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
