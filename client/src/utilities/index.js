import toastr from 'toastr';

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function fetchData(url, body = null, method = 'GET') {
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');

    // Si on a un JWT dans localStorage, on l'envoie avec la requête.
    if (localStorage.getItem('token')) {
        headers.set('x-auth-token', localStorage.getItem('token'));
    }

    const options = {
        method,
        headers,
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        if (data.errors) {
            data.errors.forEach(error => {
                toastr.error(error.msg, 'Un problème est survenu');
            });

            return false;
        }

        if (data.err) {
            // throw : Envoie une exception : coupe l'exécution du code
            throw new Error(data.err);
        }

        return data;
    } catch (err) {
        // On remet la string dans un tableau
        let message = err.message.split(',');

        return message.join('<br>');
    }
}

export { validateEmail, fetchData };
