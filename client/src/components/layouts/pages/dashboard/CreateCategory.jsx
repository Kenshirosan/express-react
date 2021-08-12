import React, { Fragment, useEffect, useState } from 'react';
import toastr from 'toastr';
import { fetchData } from '../../../../utilities';

const CreateCategory = () => {
    const [formData, setFormData] = useState({ name: '', id: '' }); // State pour le formulaire
    const [categories, setCategories] = useState([]); // State pour les catégories
    const [editMode, setEditMode] = useState(false);

    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function getCategories() {
        fetchData('/api/categories').then(data =>
            setCategories(data.categories)
        );
    }
    // Récupérer les catégories au chargement du composant
    useEffect(() => {
        getCategories();
    }, []);

    /**
     * @desc fonction qui va permettre de créé ou de mettre à jour les catégories
     * @param e event
     */
    function onSubmitHandler(e) {
        e.preventDefault();

        if (!formData.name || formData.name === '') {
            setEditMode(false);
            setFormData({ name: '' });
            return toastr.error(
                'Le nom de la catégorie est obligatoire',
                '...'
            );
        }

        let action = 'create';

        // Si edit mode : url = ''
        if (editMode) {
            action = 'update';
        }

        fetchData(`/api/categories/${action}`, formData, 'POST').then(data => {
            setFormData({ name: '' });
            getCategories();

            setEditMode(false);
        });
    }

    function edit(id) {
        const cat = categories.find(category => category._id === id);

        setFormData({ name: cat.name, id: cat._id });

        setEditMode(true);
    }

    function destroy(id) {
        if (window.confirm('Etes vous sur ?')) {
            fetchData('/api/categories/destroy', { id }, 'POST').then(data => {
                // Filtre les catégories et on enlève celle dont l'id correspond au param id
                // const newCategories = categories.filter(
                //     category => category._id !== id
                // );

                return getCategories();

                // return setCategories(newCategories);
            });
        }

        return false;
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
                            type="text"
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

            <div className="col-md-3">
                <h2 className="text-center">Catégories</h2>
                <hr />
                {/* MAP ici pour afficher toutes les catégories */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Catégorie</th>
                            <th>Mettre à jour</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>
                                    <button
                                        onClick={() => destroy(category._id)}
                                        type="button"
                                        className="btn btn-danger btn-sm mx-3"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => edit(category._id)}
                                        type="button"
                                        className="btn btn-primary btn-sm mx-3"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CreateCategory;
