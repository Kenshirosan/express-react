import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import toastr from 'toastr';
import 'react-quill/dist/quill.snow.css';
import { fetchData } from '../../../../utilities';

function CreateArticle() {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        metaDescription: '',
        category: '',
    });
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    // Avoir un boolean pour décider si le formulaire crée un article ou s'il le met à jour.

    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }], // Faire plus de titres
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image', 'video'], // Faire qqchose pour que link fonctionne
            ['clean'],
        ],
    };

    useEffect(() => {
        getArticles();
        getCategories();
    }, []);

    function getCategories() {
        fetchData('/api/categories').then(data =>
            setCategories(data.categories)
        );
    }

    function onChangeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleChangeQuill(value) {
        setFormData({ ...formData, body: value });
    }

    function getArticles() {
        fetchData('/api/articles').then(data => {
            setArticles(data.articles);
        });
    }

    function onSubmitHandler(e) {
        e.preventDefault();

        let action = 'create';

        // Si on est en mode mise à jour action = autre chose

        fetchData(`/api/articles/${action}`, formData, 'POST').then(data => {
            toastr.success('Article Créé !', 'Woohooo !!');
            getArticles();
        });
    }

    function editArticle(id, e) {
        e.preventDefault();

        console.log(id);
    }
    const { title, body, metaDescription } = formData;

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
                        <label htmlFor="metaDescription" className="form-label">
                            Meta Description
                        </label>
                        <input
                            type="text"
                            name="metaDescription"
                            className="form-control"
                            id="metaDescription"
                            value={metaDescription || ''}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="col-md-8">
                        <label htmlFor="metaDescription" className="form-label">
                            Catégories de l'article
                        </label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="category"
                            onChange={onChangeHandler}
                        >
                            <option defaultValue>Open this select menu</option>
                            {categories.map(category => {
                                return (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="body" className="form-label">
                            Contenu
                        </label>
                        <ReactQuill
                            name="body"
                            value={body}
                            id="body"
                            modules={modules}
                            onChange={handleChangeQuill}
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-md-4 offset-1">
                <h2>
                    Liste des articles :{' '}
                    <small className="d-block fw-lighter fs-6 text-info">
                        Cliquez pour mettre à jour
                    </small>
                </h2>
                <ul className="list-group">
                    {articles &&
                        articles.map(art => {
                            return (
                                <li key={art._id}>
                                    <a
                                        onClick={e => editArticle(art._id, e)}
                                        href="!#"
                                    >
                                        {art.title}
                                    </a>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}

// !! Si on veut pouvoir renommer les composants quand on les importe : Il ne faut pas les export default !!
export { CreateArticle };
