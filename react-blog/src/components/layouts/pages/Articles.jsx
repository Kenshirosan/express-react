import React, { useState } from 'react';

function Articles() {
    const [formData, setFormData] = useState({ title: '', body: '' });

    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function onSubmitHandler(e) {
        console.log(e);
    }

    const { title, body } = formData;

    return (
        <div className="row">
            <div className="col-md-6">
                <h2>Ajouter un article</h2>
                <form className="row g-3 mb-5" onSubmit={onSubmitHandler}>
                    <div className="col-md-8">
                        <label htmlFor="title" className="form-label">
                            Titre
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            id="title"
                            value={title || ''}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="body" className="form-label">
                            Contenu
                        </label>
                        <textarea
                            name="body"
                            className="form-control"
                            id="body"
                            value={body || ''}
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
        </div>
    );
}

// !! Si on veut pouvoir renommer les composants quand on les importe : Il ne faut pas les export default !!
export { Articles };
