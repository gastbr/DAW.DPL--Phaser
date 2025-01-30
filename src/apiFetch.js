/* export default async function apiFetch() {
    const url = "https://daw2-dpl-expressgenerator.onrender.com/api/bicicletas";
    await fetch(url)
        .then((response) => {
            console.log('response', response.json());
        })
        .then(data => console.log(data))
        .catch (error => console.error(error));
} */

export default async function apiFetch(cb) {
    const url = "https://daw2-dpl-expressgenerator.onrender.com/api/bicicletas";
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (cb) cb();
        return data;
    } catch (error) {
        console.error(error);
    }
}