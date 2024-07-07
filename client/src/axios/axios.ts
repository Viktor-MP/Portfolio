import axios from "axios"


const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_URL,
});


$api.interceptors.request.use( config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})


function isAxiosError(
    error: any
): error is { response: { data: { error: string } } } {
    return (
        typeof error.response.data.error === "string"
    );
}


export {isAxiosError, $api}
