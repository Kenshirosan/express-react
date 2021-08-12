import { useState } from 'react';
import toastr from 'toastr';
import LinkBack from '../layouts/common/LinkBack';
import { validateEmail, fetchData } from '../../utilities';

const Register = () => {
    // Un State pour le formulaire.
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: '',
    });

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
        //
        if (password2 !== password || !validateEmail(email)) {
            return toastr.error(
                'Formulaire invalide',
                'Attention à ce que vous écrivez'
            );
        }

        const data = await fetchData('/api/users/register', formData, 'POST');

        if (data.msg) {
            setTimeout(() => {
                window.location = '/login';
            }, 3000);

            return toastr.success(data.msg, "Oh Mais c'est super");
        }

        if (data) {
            return toastr.error(
                'Formulaire invalide',
                'Attention à ce que vous écrivez'
            );
        }

        return false;
    };

    return (
        <article className="container mt-5">
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
