import React, { Fragment, useState } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
        password: '',
    });

    // Récupérer les données des inputs
    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const loadImage = e => {
        console.log(e);
    };

    // Envoyer le formulaire dans la base de données

    const { name, email, avatar, password } = formData;

    return (
        <Fragment>
            <h2>Vos informations :</h2>
            <form>
                <div className="mb-3 col-md-4">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="avatar" className="form-label">
                        Name
                    </label>
                    <input
                        type="file"
                        name="avatar"
                        className="form-control"
                        id="name"
                        onChange={loadImage}
                    />
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        autoComplete="off"
                        aria-describedby="emailHelp"
                        onChange={onChangeHandler}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        autoComplete="off"
                        onChange={onChangeHandler}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </Fragment>
    );
};

export default Profile;
