import React, { Fragment, useEffect, useState } from 'react';
import { fetchData } from '../../../utilities';

const Category = () => {
    const [formData, setFormData] = useState({ name: '' }); // State pour le formulaire
    const [categories, setCategories] = useState([]); // State pour les catégories

    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    // Récupérer les catégories au chargement du composant
    useEffect(() => {
        fetchData('/api/categories').then(data =>
            setCategories(data.categories)
        );
    }, []);

    /**
     * @desc fonction qui va permettre de créé ou de mettre à jour les catégories
     * @param e event
     */
    function onSubmitHandler(e) {
        e.preventDefault();

        fetchData('/api/categories/create', formData, 'POST').then(data => {
            setFormData({ name: '' });
        });
    }

    const { name } = formData;

    return (
        <div className="row">
            <div className="col-md-6">
                <h2>Ajouter une catégorie</h2>
                <form className="row g-3 mb-5" onSubmit={onSubmitHandler}>
                    <div className="col-md-8">
                        <label htmlFor="name" className="form-label">
                            Category Name
                        </label>
                        <input
                            type="name"
                            name="name"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </form>
            </div>

            <div className="col-md-3 card">
                <div className="col-md-12">
                    <h2>Catégories</h2>
                    <hr />
                    {/* MAP ici pour afficher toutes les catégories */}
                    {categories.map(category => (
                        <div key={category.id}>
                            <h4 className="d-inline-block">{category.name}</h4>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm mx-3"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
