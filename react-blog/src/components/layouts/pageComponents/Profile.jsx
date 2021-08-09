import React, { Fragment, useState } from 'react';

function Profile() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
        password: '',
    });

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
    async function onSubmitHandler(e) {
        e.preventDefault();

        // Faire fetch ici : URL : /api/users/update
        console.log(e.target);
    }

    const { name, email, avatar, password } = formData;

    return (
        <Fragment>
            <h2>Vos informations :</h2>
            <form onSubmit={onSubmitHandler}>
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
                        Votre photo de profil
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
}

export default Profile;
