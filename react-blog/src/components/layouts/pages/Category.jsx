import React, { useState } from 'react';
import { fetchData } from '../../../utilities';

const Category = () => {
    const [formData, setFormData] = useState({ name: '' });

    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function onSubmitHandler(e) {
        e.preventDefault();

        fetchData('/api/categories/create', formData, 'POST').then(data =>
            console.log(formData)
        );
    }

    const { name } = formData;

    return (
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
                    Sign in
                </button>
            </div>
        </form>
    );
};

export default Category;
