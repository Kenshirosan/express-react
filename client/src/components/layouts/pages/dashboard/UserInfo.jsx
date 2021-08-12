import React, { Fragment, useState, useEffect } from 'react';
import { fetchData } from '../../../../utilities';
import Notification from '../../common/Notification';

function UserInfo() {
    const [user, setUser] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
    });

    // State pour notifications
    const [notify, setNotify] = useState(false);
    const [message, setMessage] = useState('');
    const [level, setLevel] = useState('alert-success');

    function maybeNotify(mess, level, timeout = 5000) {
        setNotify(true);
        setMessage(mess);
        setLevel(level);
        setTimeout(() => {
            setNotify(false);
            setMessage('');
        }, timeout);
    }

    useEffect(() => {
        fetchData('/api/users/currentUser').then(data => updateState(data));
    }, []);

    function updateState(data) {
        setUser(data.user);
        setFormData({
            name: data.user.name,
            email: data.user.email,
            avatar: data.user.avatar,
        });
    }

    // Récupérer les données des inputs
    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function loadImage(e) {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = e => {
            setFormData({ ...formData, avatar: e.target.result });
        };
    }

    // Envoyer le formulaire dans la base de données
    function onSubmitHandler(e) {
        e.preventDefault();

        // Faire fetch ici : URL : /api/users/update
        fetchData('/api/users/update', formData, 'POST').then(data => {
            updateState(data);

            return maybeNotify(data.msg, 'alert-success');
        });

        // Si erreur de token : On fait un logout et on redirige vers la page /login
    }

    function deleteUser(e) {
        e.preventDefault();

        // Demandez confirmation ?
        if (window.confirm('Etes vous sur ?? 😢')) {
            // Effacer
            fetchData('/api/users/destroy', null, 'POST').then(data => {
                maybeNotify(data.msg, 'alert-success');

                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Redirige vers : Accueil ou Register
                setTimeout(() => {
                    window.location = '/';
                }, 3000);
            });
        }

        return false;
    }

    const { name, email } = formData;

    return (
        <div className="row">
            <h2>Vos informations :</h2>
            <div className="col-md-4">
                <Notification
                    message={message}
                    visible={notify}
                    level={level}
                />
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="name"
                            value={name || ''}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="avatar" className="form-label">
                            Votre photo de profil
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            className="form-control"
                            id="avatar"
                            onChange={loadImage}
                        />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={email}
                            autoComplete="off"
                            aria-describedby="emailHelp"
                            onChange={onChangeHandler}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
            <div className="col-md-6 offset-2">
                <div className="card mb-3" style={{ maxWidth: '540px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img
                                src={user.avatar}
                                className="img-fluid rounded-start"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <p className="card-text">{user.email}</p>
                                <p className="card-text">
                                    <small className="text-muted d-block">
                                        Profile crée le :{' '}
                                        {new Date(
                                            user.createdAt
                                        ).toLocaleDateString()}{' '}
                                    </small>
                                    <small className="text-muted">
                                        Dernière mise à jour :{' '}
                                        {new Date(
                                            user.updatedAt
                                        ).toLocaleDateString()}{' '}
                                        à{' '}
                                        {new Date(
                                            user.updatedAt
                                        ).toLocaleTimeString()}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={deleteUser}>
                    <button className="btn btn-danger btn-sm" type="submit">
                        Effacer le compte
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserInfo;
