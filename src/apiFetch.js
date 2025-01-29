export default function apiFetch() {
    const url = "https://daw2-dpl-expressgenerator.onrender.com/api/bicicletas";
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data)
        .then((error) => error);
}