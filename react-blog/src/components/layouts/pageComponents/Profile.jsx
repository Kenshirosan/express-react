import React, { Fragment } from 'react';

const Profile = () => {
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
