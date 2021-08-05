// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function fetchData(url, body = null, method = 'GET') {
    let headers = new Headers();

    if (method === 'POST') {
        headers.set('Content-Type', 'application/json');
    }

    const options = {
        method: method,
        headers: headers,
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(url, options);
        const data = await res.json();

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
