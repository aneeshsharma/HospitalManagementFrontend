let BACKEND_ENDPOINT;
if (process.env.NODE_ENV !== 'production') {
    BACKEND_ENDPOINT = 'http://localhost:8080';
} else {
    BACKEND_ENDPOINT =
        'https://hospital-management-backend-duc2lxyq4q-el.a.run.app';
}

console.log(BACKEND_ENDPOINT);
console.log(process.env);

export default BACKEND_ENDPOINT;
