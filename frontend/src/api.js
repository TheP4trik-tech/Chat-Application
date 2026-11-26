export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('token')
    const response = await fetch(url, {...options, headers: {...options.headers, Authorization: token}})
    if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/auth'
    }
    return  response

}
