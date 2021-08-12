import React, { useEffect, useState } from 'react';
import toastr from 'toastr';
import { fetchData } from '../../../../utilities';

const CreateRoles = () => {
    const [formData, setFormData] = useState({ name: '', id: '' }); // State pour le formulaire
    const [roles, setRoles] = useState([]); // State pour les catégories
    const [editMode, setEditMode] = useState(false);

    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function getRoles() {
        fetchData('/api/roles').then(data => setRoles(data.roles));
    }
    // Récupérer les catégories au chargement du composant
    useEffect(() => {
        getRoles();
    }, []);

    /**
     * @desc fonction qui va permettre de créé ou de mettre à jour les rôles
     * @param e event
     */
    function onSubmitHandler(e) {
        e.preventDefault();

        if (!formData.name || formData.name === '') {
            setEditMode(false);
            setFormData({ name: '' });
            return toastr.error('Le nom du rôle est obligatoire', '...');
        }

        let action = 'create';

        // Si edit mode : url = ''
        if (editMode) {
            action = 'update';
        }

        fetchData(`/api/roles/${action}`, formData, 'POST').then(data => {
            setFormData({ name: '' });
            getRoles();
            setEditMode(false);
            if (data instanceof Object) {
                return toastr.success(data.msg, '...');
            }

            return toastr.error(data, '...');
        });
    }

    function edit(id) {
        const role = roles.find(role => role._id === id);

        setFormData({ name: role.name, id: role._id });

        setEditMode(true);
    }

    function destroy(id) {
        if (window.confirm('Etes vous sur ?')) {
            fetchData('/api/roles/destroy', { id }, 'POST').then(data => {
                toastr.success('Rôle effacé !', '...');
                return getRoles();
            });
        }

        return false;
    }

    const { name } = formData;

    return (
        <div className="row">
            <div className="col-md-6">
                <h2>Ajouter un rôle</h2>
                <form className="row g-3 mb-5" onSubmit={onSubmitHandler}>
                    <div className="col-md-8">
                        <label htmlFor="name" className="form-label">
                            Rôle Name
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
                <h2 className="text-center">Rôle</h2>
                <hr />
                {/* MAP ici pour afficher toutes les catégories */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Rôle</th>
                            <th>Mettre à jour</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles &&
                            roles.map(role => (
                                <tr key={role._id}>
                                    <td>{role.name}</td>
                                    <td>
                                        <button
                                            onClick={() => destroy(role._id)}
                                            type="button"
                                            className="btn btn-danger btn-sm mx-3"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => edit(role._id)}
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

export default CreateRoles;
